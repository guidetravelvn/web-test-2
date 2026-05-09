-- GuideTravel Database Schema

-- Profiles (extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  type TEXT NOT NULL CHECK (type IN ('tourist', 'guide')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- HDV Profiles
CREATE TABLE IF NOT EXISTS hdv_profiles (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  email TEXT,
  name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  region TEXT,
  regions TEXT[] DEFAULT '{}',
  experience INTEGER DEFAULT 0,
  license TEXT,
  bio TEXT,
  bio_en TEXT DEFAULT '',
  price_per_day INTEGER DEFAULT 0,
  commission INTEGER DEFAULT 15,
  languages TEXT[] DEFAULT '{}',
  specialties TEXT[] DEFAULT '{}',
  rating NUMERIC DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  trips INTEGER DEFAULT 0,
  review_list JSONB DEFAULT '[]',
  sample_itineraries JSONB DEFAULT '[]',
  itineraries JSONB DEFAULT '[]',
  avatar TEXT,
  cover_img TEXT,
  verified BOOLEAN DEFAULT TRUE,
  status TEXT DEFAULT 'pending_review',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE hdv_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read hdv_profiles" ON hdv_profiles FOR SELECT USING (true);
CREATE POLICY "Owner can update hdv_profile" ON hdv_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Owner can insert hdv_profile" ON hdv_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Tour Requests / Bookings
CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  guide_id TEXT,
  guide_name TEXT,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  name TEXT,
  phone TEXT,
  email TEXT,
  destination TEXT,
  date DATE,
  days INTEGER DEFAULT 1,
  people INTEGER DEFAULT 1,
  notes TEXT DEFAULT '',
  pay_method TEXT,
  total_amount INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  completion_photo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tourist can read own requests" ON requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Tourist can insert requests" ON requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Tourist can update own requests" ON requests FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Guide can read requests for them" ON requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM hdv_profiles WHERE hdv_profiles.id = requests.guide_id AND hdv_profiles.user_id = auth.uid())
);
CREATE POLICY "Guide can update requests for them" ON requests FOR UPDATE USING (
  EXISTS (SELECT 1 FROM hdv_profiles WHERE hdv_profiles.id = requests.guide_id AND hdv_profiles.user_id = auth.uid())
);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  request_id TEXT REFERENCES requests(id) ON DELETE CASCADE,
  from_email TEXT,
  from_type TEXT,
  from_name TEXT,
  text TEXT,
  time TIMESTAMPTZ DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parties can read messages" ON messages FOR SELECT USING (true);
CREATE POLICY "Parties can insert messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Parties can update messages" ON messages FOR UPDATE USING (true);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  guide_name TEXT,
  guide_id TEXT,
  tourist_id UUID REFERENCES auth.users ON DELETE SET NULL,
  tourist_name TEXT,
  stars INTEGER CHECK (stars BETWEEN 1 AND 5),
  text TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Tourist can insert review" ON reviews FOR INSERT WITH CHECK (auth.uid() = tourist_id);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  type TEXT,
  title TEXT,
  body TEXT,
  target_type TEXT,
  target_id TEXT,
  read BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read notifications" ON notifications FOR SELECT USING (true);
CREATE POLICY "Anyone can insert notifications" ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update notifications" ON notifications FOR UPDATE USING (true);
