'use strict';

// Redirect Supabase password recovery link to login.html if landed on wrong page
(function() {
  const h = location.hash;
  if (!h.includes('type=recovery')) return;
  const pg = location.pathname.split('/').pop() || 'index';
  if (pg !== 'login.html' && pg !== 'login') location.replace('login.html' + h);
})();

// ===== SEED DEMO ACCOUNTS =====
(function seedDemo() {
  const demos = [
    { email:'khach@demo.vn', pass:'123456', name:'Nguyễn Thị Mai', type:'tourist', phone:'0912345678' },
    { email:'khoa@guidetravel.vn', pass:'123456', name:'Nguyễn Minh Khoa', type:'guide', phone:'0901234567', verified:true }
  ];
  const demoEmails = demos.map(d => d.email);
  let users = JSON.parse(localStorage.getItem('gt_users') || '[]');
  users = users.filter(u => !demoEmails.includes(u.email));
  users.push(...demos);
  localStorage.setItem('gt_users', JSON.stringify(users));
  // Fix gt_session if it's a corrupted demo account
  const session = JSON.parse(localStorage.getItem('gt_session') || 'null');
  if (session && demoEmails.includes(session.email)) {
    const correct = demos.find(d => d.email === session.email);
    if (correct && session.type !== correct.type) {
      localStorage.setItem('gt_session', JSON.stringify(correct));
    }
  }
})();

// ===== DỮ LIỆU HDV =====
const GUIDES = [
  {
    id: 1,
    name: 'Nguyễn Minh Khoa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    coverImg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    location: 'Nha Trang, Khánh Hòa',
    regions: ['nha-trang', 'da-lat'],
    languages: ['Tiếng Việt', 'English', '中文'],
    experience: 7,
    pricePerDay: 800000,
    rating: 4.9,
    reviews: 142,
    trips: 310,
    responseTime: '< 2 giờ',
    verified: true,
    commission: 25,
    specialties: ['bien', 'lan-bien', 'am-thuc'],
    bio: 'Sinh ra và lớn lên tại Nha Trang, tôi hiểu từng góc phố, từng con hẻm và những điểm đến ít người biết nhất. Với 7 năm kinh nghiệm dẫn tour, tôi cam kết mang đến hành trình cá nhân hóa 100% theo sở thích của bạn — từ lặn biển ngắm san hô đến thưởng thức bún cá buổi sáng cùng người địa phương.',
    bioEn: 'Born and raised in Nha Trang, I know every street corner, every alley and the most hidden local gems. With 7 years of guiding experience, I craft 100% personalized journeys — from coral reef diving to sharing a bowl of local fish noodle soup at sunrise with the fishermen.',
    sampleItineraries: [
      {
        title: 'Nha Trang 3 ngày - Biển & Ẩm thực',
        titleEn: 'Nha Trang 3 Days – Beach & Food',
        days: 3,
        price: 2400000,
        desc: 'Ngày 1: Đảo Hòn Mun lặn ngắm san hô. Ngày 2: Làng chài, chợ đêm, ẩm thực đường phố. Ngày 3: Tắm bùn khoáng, spa, mua đặc sản.',
        descEn: 'Day 1: Hon Mun Island coral reef snorkeling. Day 2: Fishing village, night market, street food. Day 3: Mineral mud bath spa, local specialty shopping.'
      },
      {
        title: 'Khám phá Nha Trang ẩn 2 ngày',
        titleEn: 'Hidden Nha Trang 2 Days',
        days: 2,
        price: 1600000,
        desc: 'Những địa điểm ít du khách biết: chùa cổ trên núi, làng chài Bình Ba, bãi biển hoang sơ Bãi Dài.',
        descEn: 'Off-the-beaten-path spots: ancient hilltop pagoda, Binh Ba fishing village, pristine Bai Dai beach with no crowds.'
      }
    ],
    reviewList: [
      { name: 'Lê Thu Hà', date: '15/04/2024', stars: 5, text: 'Anh Khoa rất nhiệt tình, hiểu biết sâu về Nha Trang. Lịch trình linh hoạt, không bị ép mua sắm. Sẽ đặt lại lần sau!' },
      { name: 'Trần Văn Hùng', date: '02/03/2024', stars: 5, text: 'Tour gia đình 5 người rất vui. Anh biết điểm ăn ngon, giá hợp lý. Đặc biệt là chỗ lặn biển — đẹp hơn tour thường rất nhiều.' },
      { name: 'Phạm Quỳnh Anh', date: '20/02/2024', stars: 4, text: 'Nhìn chung rất hài lòng. Anh nói tiếng Anh tốt nên bạn bè người nước ngoài của mình cũng thích.' }
    ]
  },
  {
    id: 2,
    name: 'Trần Thị Lan Anh',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2aa?w=200&q=80',
    coverImg: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&q=80',
    location: 'Hội An, Quảng Nam',
    regions: ['hoi-an', 'da-nang'],
    languages: ['Tiếng Việt', 'English', 'Français'],
    experience: 5,
    pricePerDay: 700000,
    rating: 4.8,
    reviews: 98,
    trips: 215,
    responseTime: '< 1 giờ',
    verified: true,
    commission: 20,
    specialties: ['van-hoa', 'lich-su', 'am-thuc', 'chup-anh'],
    bio: 'Là hướng dẫn viên văn hóa được cấp phép tại Hội An, tôi đam mê chia sẻ câu chuyện ít người biết đằng sau mỗi ngôi nhà cổ, mỗi nghề truyền thống. Tôi giúp bạn trải nghiệm Hội An không phải như một khách du lịch, mà như một người dân địa phương.',
    bioEn: 'A licensed cultural guide in Hoi An, I love sharing the untold stories behind every ancient house and traditional craft. I help you experience Hoi An not as a tourist, but as a local — discovering the real soul of the town.',
    sampleItineraries: [
      {
        title: 'Hội An - Phố Cổ & Làng Nghề 2 ngày',
        titleEn: 'Hoi An – Old Town & Craft Villages 2 Days',
        days: 2,
        price: 1400000,
        desc: 'Ngày 1: Phố cổ lúc bình minh, học làm đèn lồng, ăn Cao Lầu chính gốc. Ngày 2: Làng rau Trà Quế, đạp xe, thả đèn hoa đăng buổi tối.',
        descEn: 'Day 1: Ancient town at dawn, lantern-making workshop, authentic Cao Lau noodles. Day 2: Tra Que herb village, cycling through rice paddies, floating lanterns at dusk.'
      },
      {
        title: 'Đà Nẵng - Hội An 3 ngày trọn vẹn',
        titleEn: 'Da Nang – Hoi An 3 Full Days',
        days: 3,
        price: 2100000,
        desc: 'Kết hợp Bà Nà Hills, phố cổ Hội An, Mỹ Sơn và bãi biển Mỹ Khê trong 3 ngày.',
        descEn: 'Combining Ba Na Hills (Golden Bridge), Hoi An Ancient Town, My Son Sanctuary and My Khe Beach in 3 unforgettable days.'
      }
    ],
    reviewList: [
      { name: 'Nguyễn Bảo Long', date: '10/04/2024', stars: 5, text: 'Chị Lan Anh kể chuyện lịch sử rất hay và hấp dẫn. Gia đình mình ai cũng thích. Nhất là 2 đứa con nhỏ — không ngờ chúng lại say mê nghe kể chuyện như vậy.' },
      { name: 'Vũ Thị Mai', date: '25/03/2024', stars: 5, text: 'Lịch trình cá nhân hóa hoàn toàn theo yêu cầu. Chị biết rất nhiều địa điểm chụp ảnh đẹp, có những góc mà tour thường không bao giờ đến.' }
    ]
  },
  {
    id: 3,
    name: 'Võ Thanh Tùng',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    coverImg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    location: 'Sapa, Lào Cai',
    regions: ['sapa', 'ha-giang'],
    languages: ['Tiếng Việt', 'English'],
    experience: 9,
    pricePerDay: 650000,
    rating: 4.9,
    reviews: 187,
    trips: 420,
    responseTime: '< 3 giờ',
    verified: true,
    commission: 30,
    specialties: ['trekking', 'van-hoa-dan-toc', 'chup-anh', 'cam-trai'],
    bio: 'Người dân tộc Tày, sinh ra ở vùng núi Tây Bắc. Tôi dẫn tour trekking 9 năm qua các bản làng H\'Mông, Dao, Tày — nơi ít hướng dẫn viên thành phố nào có thể đưa bạn đến. Tôi nói được 3 thứ tiếng dân tộc, giúp bạn giao tiếp thật sự với bà con địa phương.',
    bioEn: 'A Tay ethnic local, born in the Northwest mountains. I\'ve led trekking tours for 9 years through H\'Mong, Dao and Tay villages — places very few city guides can take you. I speak 3 ethnic languages, helping you connect authentically with the communities we visit.',
    sampleItineraries: [
      {
        title: 'Sapa Trekking - Bản Làng 3 ngày',
        titleEn: 'Sapa Trekking – Village Life 3 Days',
        days: 3,
        price: 1950000,
        desc: 'Đi bộ qua ruộng bậc thang, ngủ homestay bản H\'Mông, chợ phiên Bắc Hà, đỉnh Fansipan.',
        descEn: 'Trek through terraced rice fields, overnight homestay in an H\'Mong village, Bac Ha weekly market, summit Fansipan peak.'
      },
      {
        title: 'Hà Giang Loop 4 ngày',
        titleEn: 'Ha Giang Loop 4 Days',
        days: 4,
        price: 2600000,
        desc: 'Cao nguyên đá Đồng Văn, mèo vạc, đèo Mã Pì Lèng, làng văn hóa người Mông.',
        descEn: 'Dong Van Rock Plateau, Meo Vac town, the legendary Ma Pi Leng Pass, and authentic H\'Mong cultural villages.'
      }
    ],
    reviewList: [
      { name: 'Đinh Thị Hoa', date: '05/04/2024', stars: 5, text: 'Anh Tùng là HDV tuyệt nhất mình từng gặp. Biết mọi con đường, mọi điểm ngắm cảnh. Quan trọng là rất an toàn, luôn để ý sức khỏe của đoàn.' },
      { name: 'Lý Minh Đức', date: '12/03/2024', stars: 5, text: 'Tour Hà Giang 4 ngày không thể quên. Anh kết nối được với người dân địa phương một cách rất tự nhiên và chân thật.' }
    ]
  },
  {
    id: 4,
    name: 'Huỳnh Thanh Thảo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    coverImg: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=600&q=80',
    location: 'Hạ Long, Quảng Ninh',
    regions: ['ha-long', 'ninh-binh'],
    languages: ['Tiếng Việt', 'English', '日本語'],
    experience: 6,
    pricePerDay: 750000,
    rating: 4.7,
    reviews: 76,
    trips: 165,
    responseTime: '< 2 giờ',
    verified: true,
    commission: 15,
    specialties: ['bien', 'kayak', 'thien-nhien', 'chup-anh'],
    bio: 'Chuyên gia về vịnh Hạ Long với chứng chỉ hướng dẫn viên quốc tế. Tôi thiết kế tour khám phá những góc khuất của Hạ Long mà ít du khách biết đến — những hang động chưa được khai thác, làng chài yên tĩnh và những buổi bình minh tuyệt đẹp trên vịnh.',
    bioEn: 'Ha Long Bay specialist with an international guiding certification. I design tours exploring Ha Long\'s hidden corners — undiscovered caves, quiet floating villages and breathtaking sunrises over the bay that you won\'t find on any group tour.',
    sampleItineraries: [
      {
        title: 'Hạ Long Bí Ẩn 2 ngày',
        titleEn: 'Secret Ha Long 2 Days',
        days: 2,
        price: 1500000,
        desc: 'Kayak vào hang Tối, làng nổi Cửa Vạn, bình minh trên vịnh, câu mực đêm.',
        descEn: 'Kayak into Dark Cave, Cua Van floating fishing village, sunrise on the bay, night squid fishing.'
      }
    ],
    reviewList: [
      { name: 'Phan Thị Linh', date: '01/04/2024', stars: 5, text: 'Chị Thảo rất chuyên nghiệp và biết tiếng Nhật nên bố mẹ mình (người Nhật) rất vui. Lịch trình linh hoạt, phù hợp với người già và trẻ em.' }
    ]
  },
  {
    id: 5,
    name: 'Đặng Quốc Bảo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    coverImg: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?w=600&q=80',
    location: 'Đà Lạt, Lâm Đồng',
    regions: ['da-lat', 'mui-ne'],
    languages: ['Tiếng Việt', 'English'],
    experience: 4,
    pricePerDay: 600000,
    rating: 4.8,
    reviews: 64,
    trips: 130,
    responseTime: '< 1 giờ',
    verified: false,
    commission: 15,
    specialties: ['thien-nhien', 'am-thuc', 'ca-phe', 'chup-anh'],
    bio: 'Sinh ra ở Đà Lạt, tôi biết nơi uống cà phê đẹp nhất lúc 6 giờ sáng, con đường hoa dã quỳ vàng rực vào tháng 11, và quán ăn chỉ người địa phương mới biết. Đà Lạt của tôi không phải phố đi bộ chen chúc — mà là những khoảnh khắc yên bình bạn sẽ nhớ mãi.',
    bioEn: 'A Da Lat native, I know the best café to catch the 6am mist rolling over the hills, the golden wildflower road in November, and the restaurants only locals know. My Da Lat isn\'t the crowded walking street — it\'s the peaceful moments you\'ll remember long after you leave.',
    sampleItineraries: [
      {
        title: 'Đà Lạt Local Experience 2 ngày',
        titleEn: 'Da Lat Local Experience 2 Days',
        days: 2,
        price: 1200000,
        desc: 'Chợ sáng địa phương, vườn dâu tây, thác hoang, cafe đẹp ít người biết, hoàng hôn trên đồi thông.',
        descEn: 'Local morning market, strawberry farm pick-your-own, hidden waterfall, secret local cafés, pine hill sunset.'
      }
    ],
    reviewList: [
      { name: 'Nguyễn Thị Kim Chi', date: '20/04/2024', stars: 5, text: 'Bạn Bảo dẫn tour cực kỳ thân thiện, nhiệt tình. Những điểm đến đều rất độc đáo, không giống tour thường chút nào. Rất recommend!' }
    ]
  },
  {
    id: 6,
    name: 'Lê Văn Phú',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80',
    coverImg: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    location: 'Phú Quốc, Kiên Giang',
    regions: ['phu-quoc', 'mekong'],
    languages: ['Tiếng Việt', 'English'],
    experience: 5,
    pricePerDay: 720000,
    rating: 4.6,
    reviews: 55,
    trips: 112,
    responseTime: '< 4 giờ',
    verified: true,
    commission: 20,
    specialties: ['bien', 'lan-bien', 'cau-ca', 'am-thuc'],
    bio: 'Người Phú Quốc chính gốc, tôi biết từng bãi biển, từng rạn san hô và những góc hoàng hôn đẹp nhất đảo ngọc. Tôi đặc biệt yêu thích đưa khách đến những điểm bình dị, chân thực — xa hàng quán du lịch, gần thiên nhiên hoang sơ.',
    bioEn: 'A born-and-bred Phu Quoc local, I know every beach, every coral reef and the best sunset spots on the island. I love taking guests to simple, authentic places — far from tourist traps and close to untouched nature only islanders know.',
    sampleItineraries: [
      {
        title: 'Phú Quốc Khám Phá 3 ngày',
        titleEn: 'Phu Quoc Explorer 3 Days',
        days: 3,
        price: 2160000,
        desc: 'Bắc đảo hoang sơ, lặn san hô Hòn Thơm, chợ đêm Dinh Cậu, hoàng hôn Bãi Sao.',
        descEn: 'Wild northern island, coral snorkeling at Hon Thom, Dinh Cau night market, sunset at Bai Sao beach.'
      }
    ],
    reviewList: [
      { name: 'Hoàng Minh Trí', date: '28/03/2024', stars: 5, text: 'Anh Phú đưa tụi mình đến những bãi biển đẹp không có trong bất kỳ cuốn guidebook nào. Authentic experience!' }
    ]
  }
];

// ===== BLOG DATA =====
const BLOG_POSTS = [
  {
    id: 1, slug: 'kinh-nghiem-du-lich-nha-trang',
    category: 'destination', region: 'nha-trang',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    date: '2024-04-10', readTime: 5,
    title: 'Kinh nghiệm du lịch Nha Trang từ A đến Z cho người lần đầu',
    titleEn: 'Complete Nha Trang Travel Guide for First-Timers',
    excerpt: 'Nha Trang có gì đẹp? Đi đâu chơi? Ăn gì ngon? Tất tần tật những gì bạn cần biết trước khi đặt vé.',
    excerptEn: 'What to see, where to eat, and how to get around Nha Trang — everything you need to know before your trip.',
    author: 'Nguyễn Minh Khoa', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    tags: ['Nha Trang', 'Biển đảo', 'Ẩm thực'],
    content: `<p>Nha Trang — thành phố biển miền Trung — từ lâu đã trở thành điểm đến yêu thích của hàng triệu du khách trong và ngoài nước. Với bờ biển dài hơn 7km, làn nước xanh trong và khí hậu nắng ấm quanh năm, Nha Trang xứng đáng là một trong những điểm đến hàng đầu Việt Nam.</p>
    <h2>Thời điểm lý tưởng để đi Nha Trang</h2>
    <p>Tháng 1 đến tháng 8 là thời gian đẹp nhất, biển êm, nắng nhiều. Tránh tháng 9–11 vì mưa bão nhiều. Tháng 7–8 đông khách nhất — nên đặt phòng sớm.</p>
    <h2>Những địa điểm không thể bỏ qua</h2>
    <ul>
      <li><strong>Đảo Hòn Mun</strong> — lặn ngắm san hô đẹp nhất vịnh Nha Trang</li>
      <li><strong>Vinpearl Land</strong> — khu vui chơi giải trí, phù hợp gia đình</li>
      <li><strong>Tháp Bà Ponagar</strong> — di tích Chăm Pa nghìn năm lịch sử</li>
      <li><strong>Bãi biển Trần Phú</strong> — bãi biển chính, đẹp nhất lúc bình minh</li>
      <li><strong>Làng chài Bình Ba</strong> — ăn tôm hùm giá rẻ chính gốc</li>
    </ul>
    <h2>Ẩm thực Nha Trang</h2>
    <p>Bún cá, nem nướng Ninh Hòa, bánh căn, gỏi cá mai — đây là những món không thể bỏ lỡ. Đặc biệt, chợ đêm Nha Trang là nơi lý tưởng để thưởng thức hải sản tươi sống với giá hợp lý.</p>
    <h2>Lời khuyên từ HDV địa phương</h2>
    <p>Muốn trải nghiệm Nha Trang đúng nghĩa, hãy tránh xa các tour đại trà. Một HDV địa phương sẽ đưa bạn đến những góc khuất mà không guidebook nào nhắc đến.</p>`,
    contentEn: `<p>Nha Trang — Vietnam's premier coastal city — has long been a favorite destination for millions of travelers. With over 7km of pristine beach, crystal-clear waters and sunshine almost year-round, it's easy to see why.</p>
    <h2>Best time to visit</h2>
    <p>January through August offers the best weather — calm seas and plenty of sunshine. Avoid September–November due to storms. July–August is peak season, so book accommodation early.</p>
    <h2>Must-see attractions</h2>
    <ul>
      <li><strong>Hon Mun Island</strong> — best coral reef snorkeling in Nha Trang Bay</li>
      <li><strong>Vinpearl Land</strong> — entertainment complex, great for families</li>
      <li><strong>Po Nagar Cham Towers</strong> — thousand-year-old Cham heritage site</li>
      <li><strong>Tran Phu Beach</strong> — the main beach, stunning at sunrise</li>
      <li><strong>Binh Ba Island</strong> — affordable fresh lobster straight from the sea</li>
    </ul>
    <h2>What to eat</h2>
    <p>Fish noodle soup, grilled spring rolls, banh can pancakes, and fresh seafood at the night market — these are must-tries that locals swear by.</p>
    <h2>Local guide tip</h2>
    <p>To truly experience Nha Trang beyond the tourist trail, skip the group tours. A local guide will take you to hidden spots no guidebook mentions.</p>`
  },
  {
    id: 2, slug: 'sapa-trekking-cho-nguoi-moi',
    category: 'tip', region: 'sapa',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    date: '2024-03-22', readTime: 7,
    title: '5 điều cần biết trước khi trekking Sapa lần đầu',
    titleEn: '5 Things to Know Before Your First Sapa Trek',
    excerpt: 'Trekking Sapa không khó nếu bạn chuẩn bị đúng. Đây là những gì mình ước đã biết trước chuyến đi đầu tiên.',
    excerptEn: 'Sapa trekking is manageable if you prepare right. Here\'s what I wish I knew before my first trip.',
    author: 'Võ Thanh Tùng', authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    tags: ['Sapa', 'Trekking', 'Mẹo hay'],
    content: `<p>Sapa những năm gần đây thu hút ngày càng nhiều du khách muốn khám phá ruộng bậc thang hùng vĩ và văn hóa dân tộc thiểu số đặc sắc. Nhưng không ít người đến Sapa mà về tiếc vì không chuẩn bị kỹ.</p>
    <h2>1. Chọn đúng mùa</h2>
    <p>Tháng 9–10 (mùa lúa vàng) và tháng 3–5 (hoa đào, hoa mận) là đẹp nhất. Tháng 12–2 rất lạnh (có thể có tuyết) — mặc đủ ấm. Tránh tháng 6–8 vì mưa nhiều, đường trơn.</p>
    <h2>2. Thuê HDV địa phương — không phải tùy chọn</h2>
    <p>HDV người dân tộc bản địa không chỉ dẫn đường — họ kết nối bạn với gia đình địa phương, giải thích văn hóa và đưa bạn đến những điểm chưa có trên Google Maps.</p>
    <h2>3. Chuẩn bị thể lực</h2>
    <p>Tour 1 ngày đi bộ trung bình 10–15km, leo dốc liên tục. Tập thể dục ít nhất 2 tuần trước, mang giày đế bám tốt và gậy trekking nếu có thể.</p>
    <h2>4. Đừng mặc cả với người dân tộc</h2>
    <p>Họ bán đồ thủ công tự làm với giá rất hợp lý. Mua ủng hộ trực tiếp — không qua trung gian — là cách du lịch có trách nhiệm nhất.</p>
    <h2>5. Nghỉ homestay ít nhất 1 đêm</h2>
    <p>Ở lại homestay bản H'Mông là trải nghiệm không thể có ở bất kỳ khách sạn nào. Ăn tối cùng gia đình, uống rượu ngô, nghe tiếng suối chảy — đó mới là Sapa thật sự.</p>`,
    contentEn: `<p>Sapa has become increasingly popular with travelers seeking stunning terraced rice fields and unique ethnic minority culture. But many visitors leave with regrets from poor preparation.</p>
    <h2>1. Choose the right season</h2>
    <p>September–October (golden rice harvest) and March–May (peach and plum blossoms) are the most beautiful. December–February is very cold (possible snow) — dress warm. Avoid June–August due to heavy rain and slippery trails.</p>
    <h2>2. Hire a local guide — it's not optional</h2>
    <p>An ethnic local guide doesn't just show you the path — they connect you with local families, explain the culture, and take you to spots not yet on Google Maps.</p>
    <h2>3. Build up your fitness</h2>
    <p>A 1-day trek covers 10–15km with continuous elevation. Train at least 2 weeks before, bring good grip shoes and trekking poles if possible.</p>
    <h2>4. Don't bargain with ethnic villagers</h2>
    <p>They sell handcrafted goods at already fair prices. Buying directly — with no middleman — is the most responsible way to travel.</p>
    <h2>5. Stay at a homestay at least one night</h2>
    <p>Spending a night in an H'Mong village homestay is an experience no hotel can replicate. Dinner with the family, corn wine by the fire, the sound of a stream — that's the real Sapa.</p>`
  },
  {
    id: 3, slug: 'hoi-an-mot-minh-co-duoc-khong',
    category: 'tip', region: 'hoi-an',
    thumbnail: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80',
    date: '2024-04-05', readTime: 4,
    title: 'Đi Hội An một mình có được không? Trả lời thật lòng',
    titleEn: 'Is Hoi An Good for Solo Travel? An Honest Answer',
    excerpt: 'Hội An thân thiện với du khách solo hơn bạn nghĩ — nhưng đây là những điều cần lưu ý để chuyến đi hoàn hảo hơn.',
    excerptEn: 'Hoi An is more solo-friendly than you might think — but here\'s what to watch out for.',
    author: 'Trần Thị Lan Anh', authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2aa?w=100&q=80',
    tags: ['Hội An', 'Solo travel', 'Mẹo hay'],
    content: `<p>Mình đã dẫn hàng trăm khách solo đến Hội An và câu trả lời luôn là: hoàn toàn được, thậm chí còn tuyệt vời hơn đi nhóm trong nhiều trường hợp.</p>
    <h2>Tại sao Hội An lý tưởng cho solo traveler</h2>
    <p>Phố cổ nhỏ gọn, dễ đi bộ hoặc thuê xe đạp. Người dân thân thiện, nói được tiếng Anh khá tốt. Chi phí rẻ — một ngày ăn uống thoải mái chỉ 200–300k. Nhiều quán cafe đẹp để ngồi làm việc remote.</p>
    <h2>Những thách thức cần biết</h2>
    <p>Một số dịch vụ tính giá cao hơn cho khách lẻ. Tour thuyền ra Cù Lao Chàm thường theo nhóm. Buổi tối phố cổ đông, nếu không thích đám đông hãy đi sớm.</p>
    <h2>Lời khuyên thực tế</h2>
    <p>Thuê xe đạp thay vì đi bộ suốt — Hội An rộng hơn bạn nghĩ. Đặt tour riêng với HDV địa phương để tránh bị gộp vào nhóm lớn. Và đừng quên thử lớp học làm đèn lồng!</p>`,
    contentEn: `<p>I've guided hundreds of solo travelers around Hoi An, and my answer is always: absolutely — in many ways it's even better solo.</p>
    <h2>Why Hoi An is perfect for solo travel</h2>
    <p>The ancient town is compact and easy to explore on foot or bicycle. Locals are friendly and English-speaking is widespread. Budget-friendly — comfortable eating costs just $8–12/day. Many great cafés for remote workers.</p>
    <h2>Challenges to be aware of</h2>
    <p>Some services charge more for solo visitors. Boat tours to Cham Island are usually group-based. The old town gets crowded at night — go early if you prefer quiet.</p>
    <h2>Practical tips</h2>
    <p>Rent a bicycle instead of walking everywhere — Hoi An is bigger than it looks. Book a private local guide to avoid being merged into large groups. And don't miss the lantern-making class!</p>`
  },
  {
    id: 4, slug: 'hdv-dia-phuong-vs-tour-dai-tra',
    category: 'guide', region: '',
    thumbnail: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
    date: '2024-03-15', readTime: 6,
    title: 'HDV địa phương vs Tour đại trà: Nên chọn cái nào?',
    titleEn: 'Local Guide vs Group Tour: Which Should You Choose?',
    excerpt: 'So sánh thật lòng hai lựa chọn phổ biến nhất khi du lịch Việt Nam — và khi nào nên dùng cái nào.',
    excerptEn: 'An honest comparison of the two most popular options for touring Vietnam — and when to use each.',
    author: 'GuideTravel Editorial', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    tags: ['Mẹo hay', 'HDV', 'Kinh nghiệm'],
    content: `<p>Câu hỏi này mình nhận được hàng ngày. Không có câu trả lời tuyệt đối đúng — tùy mục đích, ngân sách và phong cách du lịch của bạn.</p>
    <h2>Tour đại trà: Ưu và nhược</h2>
    <p><strong>Ưu:</strong> Rẻ hơn nếu đi solo, không cần lên kế hoạch, có bạn đồng hành.</p>
    <p><strong>Nhược:</strong> Lịch trình cứng nhắc, bị ép ghé cửa hàng, không được dừng lại theo ý muốn, HDV thường chỉ nói tiếng Việt, trải nghiệm giống hệt nhau với mọi khách.</p>
    <h2>HDV địa phương riêng: Ưu và nhược</h2>
    <p><strong>Ưu:</strong> Lịch trình 100% theo ý bạn, HDV biết những điểm "bí mật", kết nối văn hóa thật sự, linh hoạt thay đổi kế hoạch.</p>
    <p><strong>Nhược:</strong> Đắt hơn nếu chỉ đi 1 người, cần lên kế hoạch trước.</p>
    <h2>Kết luận thực tế</h2>
    <p>Nếu bạn đi 2 người trở lên và muốn trải nghiệm đặc biệt hơn đám đông — HDV địa phương luôn xứng đáng với chi phí. Với nhóm 4+ người, chi phí còn rẻ hơn cả tour đại trà.</p>`,
    contentEn: `<p>This is the question I get asked every day. There's no universally right answer — it depends on your purpose, budget and travel style.</p>
    <h2>Group tours: Pros and cons</h2>
    <p><strong>Pros:</strong> Cheaper for solo travelers, no planning needed, built-in company.</p>
    <p><strong>Cons:</strong> Fixed schedule, forced shopping stops, can't linger where you want, often only Vietnamese-speaking guides, identical experience for everyone.</p>
    <h2>Private local guide: Pros and cons</h2>
    <p><strong>Pros:</strong> 100% your itinerary, guide knows secret spots, genuine cultural connection, flexible to change plans.</p>
    <p><strong>Cons:</strong> More expensive for solo travelers, requires advance planning.</p>
    <h2>The practical verdict</h2>
    <p>If you're traveling with 2+ people and want something beyond the ordinary — a local guide is always worth it. With 4+ people, the cost often works out cheaper than a group tour anyway.</p>`
  },
  {
    id: 5, slug: 'phu-quoc-mua-nao-dep-nhat',
    category: 'destination', region: 'phu-quoc',
    thumbnail: 'https://images.unsplash.com/photo-1549880181-56a44cf4a9a5?w=800&q=80',
    date: '2024-02-28', readTime: 4,
    title: 'Phú Quốc mùa nào đẹp nhất? Lịch du lịch theo tháng',
    titleEn: 'Best Time to Visit Phu Quoc: A Month-by-Month Guide',
    excerpt: 'Đảo ngọc Phú Quốc đẹp quanh năm — nhưng mỗi mùa có đặc điểm riêng bạn cần biết trước khi đặt vé.',
    excerptEn: 'Phu Quoc is beautiful year-round — but each season has its quirks you need to know before booking.',
    author: 'Lê Văn Phú', authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80',
    tags: ['Phú Quốc', 'Biển đảo', 'Lịch du lịch'],
    content: `<p>Là người Phú Quốc chính gốc, mình biết rõ đảo đẹp nhất vào lúc nào — và lúc nào nên tránh.</p>
    <h2>Tháng 11 – 4: Mùa khô (Đẹp nhất)</h2>
    <p>Biển êm, nắng đẹp, tầm nhìn dưới nước tuyệt vời cho lặn ngắm san hô. Đây là mùa cao điểm — đặt phòng sớm ít nhất 1 tháng.</p>
    <h2>Tháng 5 – 10: Mùa mưa</h2>
    <p>Mưa thường chỉ đổ vài tiếng buổi chiều, sáng vẫn đẹp. Giá phòng rẻ hơn 30–50%, ít khách hơn nhiều. Lý tưởng nếu bạn muốn đảo yên tĩnh và ngân sách tiết kiệm.</p>
    <h2>Tháng đặc biệt</h2>
    <p><strong>Tháng 3–4:</strong> Biển đẹp nhất, ít gió. <strong>Tết Nguyên Đán:</strong> Rất đông, giá cao — tránh nếu không thích chen chúc.</p>
    <h2>Lời khuyên của mình</h2>
    <p>Tháng 3 là thời điểm hoàn hảo: biển lặng, nắng đẹp, chưa vào mùa cao điểm hè, giá còn hợp lý.</p>`,
    contentEn: `<p>As a Phu Quoc native, I know exactly when the island looks its best — and when to avoid it.</p>
    <h2>November – April: Dry season (Best)</h2>
    <p>Calm seas, beautiful sunshine, excellent underwater visibility for snorkeling. Peak season — book accommodation at least 1 month ahead.</p>
    <h2>May – October: Rainy season</h2>
    <p>Rain usually only falls for a few hours in the afternoon, with beautiful mornings. Room prices drop 30–50%, far fewer crowds. Ideal if you want a quiet island and a tighter budget.</p>
    <h2>Special months</h2>
    <p><strong>March–April:</strong> Calmest seas, least wind. <strong>Lunar New Year:</strong> Very crowded and expensive — avoid if you dislike crowds.</p>
    <h2>My recommendation</h2>
    <p>March is the perfect window: calm seas, great sunshine, not yet peak summer, and prices still reasonable.</p>`
  },
  {
    id: 6, slug: 'ngan-sach-du-lich-viet-nam',
    category: 'tip', region: '',
    thumbnail: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80',
    date: '2024-01-20', readTime: 5,
    title: 'Ngân sách du lịch Việt Nam 2024: Bao nhiêu là đủ?',
    titleEn: 'Vietnam Travel Budget 2024: How Much Do You Really Need?',
    excerpt: 'Từ backpacker đến luxury — bảng ngân sách thực tế cho mọi loại hình du lịch tại Việt Nam.',
    excerptEn: 'From backpacker to luxury — a realistic budget breakdown for every type of traveler in Vietnam.',
    author: 'GuideTravel Editorial', authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2aa?w=100&q=80',
    tags: ['Ngân sách', 'Mẹo hay', 'Kinh nghiệm'],
    content: `<p>Việt Nam nổi tiếng là điểm đến giá rẻ — nhưng "rẻ" là bao nhiêu? Đây là bảng ngân sách thực tế nhất mình có thể đưa ra.</p>
    <h2>Backpacker (< 500K/ngày)</h2>
    <p>Hostel 100–150K, ăn đường phố 3 bữa 150K, di chuyển xe bus/grab 50–100K. Hoàn toàn khả thi ở Hà Nội, Hội An, Đà Lạt.</p>
    <h2>Tầm trung (500K – 1.5 triệu/ngày)</h2>
    <p>Khách sạn 2–3 sao 300–600K, ăn nhà hàng địa phương, tour ngày + HDV riêng. Đây là phân khúc tốt nhất — trải nghiệm tốt mà không quá tốn.</p>
    <h2>Luxury (2 triệu+/ngày)</h2>
    <p>Resort 5 sao, spa, nhà hàng fine dining, private boat tour. Phú Quốc và Đà Nẵng có nhiều lựa chọn nhất phân khúc này.</p>
    <h2>Chi phí hay bị bỏ sót</h2>
    <p>Visa (khoảng 25–50 USD), bảo hiểm du lịch (rất quan trọng!), phí vào cửa di tích, tip cho HDV và tài xế.</p>`,
    contentEn: `<p>Vietnam is famous for being affordable — but how affordable exactly? Here's the most honest budget breakdown I can give.</p>
    <h2>Backpacker (under $20/day)</h2>
    <p>Hostel dorm $4–6, street food 3 meals $6, transport by bus/Grab $2–4. Completely doable in Hanoi, Hoi An, Da Lat.</p>
    <h2>Mid-range ($20–60/day)</h2>
    <p>2–3 star hotel $12–25, local restaurants, day tour with private guide. This is the sweet spot — great experiences without breaking the bank.</p>
    <h2>Luxury ($80+/day)</h2>
    <p>5-star resort, spa, fine dining, private boat tours. Phu Quoc and Da Nang have the most options in this bracket.</p>
    <h2>Costs people forget</h2>
    <p>Visa (~$25–50), travel insurance (very important!), entrance fees at heritage sites, tips for guides and drivers.</p>`
  },
];

const DESTINATIONS = [
  { id: 'nha-trang', name: 'Nha Trang', count: 1 },
  { id: 'hoi-an', name: 'Hội An', count: 1 },
  { id: 'da-nang', name: 'Đà Nẵng', count: 1 },
  { id: 'sapa', name: 'Sapa', count: 1 },
  { id: 'ha-long', name: 'Hạ Long', count: 1 },
  { id: 'da-lat', name: 'Đà Lạt', count: 1 },
  { id: 'phu-quoc', name: 'Phú Quốc', count: 1 },
  { id: 'ha-giang', name: 'Hà Giang', count: 1 },
];

// ===== UTILS =====
const $ = id => document.getElementById(id);
const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
const page = () => { const seg = location.pathname.split('/').pop() || 'index'; return seg.endsWith('.html') ? seg : seg + '.html'; };

function toast(msg, type = 'ok') {
  let c = $('toast-container');
  if (!c) { c = document.createElement('div'); c.id = 'toast-container'; document.body.appendChild(c); }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<i class="fa-solid fa-${type === 'ok' ? 'circle-check' : 'circle-xmark'}"></i> ${msg}`;
  c.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3000);
}

const AREA_LABELS = {'nha-trang':'Nha Trang','hoi-an':'Hội An','da-nang':'Đà Nẵng','sapa':'Sapa','ha-long':'Hạ Long','da-lat':'Đà Lạt','phu-quoc':'Phú Quốc','ha-giang':'Hà Giang'};

// ===== STORAGE =====
const DB = {
  requests: () => JSON.parse(localStorage.getItem('gt_requests') || '[]'),
  addRequest: r => { const a = DB.requests(); a.unshift(r); localStorage.setItem('gt_requests', JSON.stringify(a)); SB.saveReq(r); },
};

const SB = {
  // Requests
  async saveReq(req) { if (typeof sb==='undefined') return; try { await sb.from('requests').upsert({id:req.id,tourist_email:req.email||'',tourist_id:req.userId||null,guide_id:String(req.guideId||''),status:req.status||'pending',data:req}); } catch(e){} },
  async updateReq(id,fields) { if (typeof sb==='undefined') return; try { await sb.from('requests').update(fields).eq('id',id); } catch(e){} },
  async getByEmail(email) { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('requests').select('data').eq('tourist_email',email); return data?data.map(r=>r.data):[]; } catch(e){return null;} },
  async getAll() { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('requests').select('data'); return data?data.map(r=>r.data):[]; } catch(e){return null;} },
  // Messages
  async saveMsg(msg) { if (typeof sb==='undefined') return; try { await sb.from('messages').upsert({id:msg.id,request_id:msg.requestId,from_email:msg.fromEmail,from_type:msg.fromType,from_name:msg.fromName,text:msg.text,time:msg.time,read:msg.read}); } catch(e){} },
  async getMsgsByReqId(reqId) { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('messages').select('*').eq('request_id',reqId).order('time'); return data?data.map(r=>({id:r.id,requestId:r.request_id,fromEmail:r.from_email,fromType:r.from_type,fromName:r.from_name,text:r.text,time:r.time,read:r.read})):[]; } catch(e){return null;} },
  async getAllMsgs() { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('messages').select('*').order('time'); return data?data.map(r=>({id:r.id,requestId:r.request_id,fromEmail:r.from_email,fromType:r.from_type,fromName:r.from_name,text:r.text,time:r.time,read:r.read})):[]; } catch(e){return null;} },
  // Reviews
  async saveReview(rv) { if (typeof sb==='undefined') return; try { await sb.from('reviews').upsert({id:rv.id,guide_name:rv.guideName||'',tourist_email:rv.touristEmail||'',data:rv}); } catch(e){} },
  async getReviewsByGuide(guideName) { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('reviews').select('data').eq('guide_name',guideName); return data?data.map(r=>r.data):[]; } catch(e){return null;} },
  async getReviewsByEmail(email) { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('reviews').select('data').eq('tourist_email',email); return data?data.map(r=>r.data):[]; } catch(e){return null;} },
  // Notifications
  async saveNotif(notif) { if (typeof sb==='undefined') return; try { await sb.from('notifications').upsert({id:notif.id,target_type:notif.targetType,read:notif.read,time:notif.time,data:notif}); } catch(e){} },
  async getNotifsByType(type) { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('notifications').select('data').in('target_type',[type,'all']).order('time',{ascending:false}); return data?data.map(r=>r.data):[]; } catch(e){return null;} },
  async markNotifsRead(ids) { if (typeof sb==='undefined') return; try { await sb.from('notifications').update({read:true}).in('id',ids); } catch(e){} },
  // Reports
  async saveReport(r) { if (typeof sb==='undefined') return; try { await sb.from('reports').upsert({id:r.id,reporter_email:r.reporterEmail||'',guide_id:String(r.guideId||''),type:r.type||'',description:r.description||'',status:r.status||'pending',data:r}); } catch(e){} },
  async getReports() { if (typeof sb==='undefined') return null; try { const{data}=await sb.from('reports').select('data'); return data?data.map(r=>r.data):[]; } catch(e){return null;} },
  async getOpenReqs(area) { if (typeof sb==='undefined') return []; try { const{data}=await sb.from('requests').select('data').eq('guide_id','').eq('status','pending'); if(!data) return []; return data.map(r=>r.data).filter(r=>r.destSlug===area); } catch(e){return[];} },
  async claimReq(reqId,guideId) { if (typeof sb==='undefined') return false; try { const{data}=await sb.from('requests').update({guide_id:guideId}).eq('id',reqId).eq('guide_id','').select('id'); return !!(data&&data.length>0); } catch(e){return false;} },
};

// ===== AUTH =====
const Auth = {
  session: () => JSON.parse(localStorage.getItem('gt_session') || 'null'),
  logout: () => { localStorage.removeItem('gt_session'); location.href = 'login.html'; },
};

// ===== NAVBAR =====
function initNav() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10));
  const pg = page();
  document.querySelectorAll('.nav-links a, .mob-panel a').forEach(a => {
    if (a.getAttribute('href') === pg) a.classList.add('active');
  });
  const ham = document.querySelector('.hamburger');
  const mob = document.querySelector('.mob-menu');
  const close = document.querySelector('.mob-close');
  ham?.addEventListener('click', () => mob?.classList.add('open'));
  close?.addEventListener('click', () => mob?.classList.remove('open'));
  mob?.addEventListener('click', e => { if (e.target === mob) mob.classList.remove('open'); });

  // Lang switcher in navbar (mobile only, next to hamburger)
  if (ham && !document.querySelector('.mob-lang-nav')) {
    const cur = localStorage.getItem('gt_lang') || 'vi';
    const mobLangNav = document.createElement('div');
    mobLangNav.className = 'mob-lang-nav';
    mobLangNav.style.cssText = 'display:none;gap:2px;align-items:center';
    mobLangNav.innerHTML = `
      <button onclick="setLang('vi')" data-lang="vi" style="padding:4px 7px;font-size:.72rem;font-weight:700;border:1px solid var(--border);border-radius:6px 0 0 6px;cursor:pointer;background:${cur==='vi'?'var(--blue)':'white'};color:${cur==='vi'?'white':'var(--gray-2)'}">VI</button>
      <button onclick="setLang('en')" data-lang="en" style="padding:4px 7px;font-size:.72rem;font-weight:700;border:1px solid var(--border);border-left:none;border-radius:0 6px 6px 0;cursor:pointer;background:${cur==='en'?'var(--blue)':'white'};color:${cur==='en'?'white':'var(--gray-2)'}">EN</button>`;
    ham.parentNode.insertBefore(mobLangNav, ham);
    // Show only on mobile
    const showMobLang = () => { mobLangNav.style.display = window.innerWidth <= 768 ? 'flex' : 'none'; };
    showMobLang();
    window.addEventListener('resize', showMobLang);
  }

  // Auth buttons in nav-right (only on pages that don't have custom nav-right)
  const navRight = document.querySelector('.nav-right');
  if (navRight && !navRight.id) {
    const session = Auth.session();
    const langToggle = `<div style="display:flex;gap:2px;border:1px solid var(--border);border-radius:8px;overflow:hidden;flex-shrink:0">
      <button class="lang-btn" data-lang="vi" onclick="setLang('vi')" style="padding:5px 9px;font-size:.75rem;font-weight:700;border:none;cursor:pointer;background:white;color:var(--gray-2)">🇻🇳 VI</button>
      <button class="lang-btn" data-lang="en" onclick="setLang('en')" style="padding:5px 9px;font-size:.75rem;font-weight:700;border:none;cursor:pointer;background:white;color:var(--gray-2)">🇬🇧 EN</button>
    </div>`;
    if (session) {
      // Count pending requests for guide
      let badge = '';
      if (session.type === 'guide') {
        const reqs = JSON.parse(localStorage.getItem('gt_requests') || '[]');
        const newCount = reqs.filter(r => r.guideId === session.id && r.status === 'pending').length;
        if (newCount > 0) {
          badge = `<span style="position:absolute;top:-6px;right:-6px;background:#EF4444;color:white;font-size:.65rem;font-weight:800;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;line-height:1">${newCount > 9 ? '9+' : newCount}</span>`;
        }
      }
      const dashLink = session.type === 'guide'
        ? `<a href="hdv-dashboard.html" class="btn btn-outline btn-sm" style="color:var(--dark);position:relative"><i class="fa-solid fa-gauge"></i> Dashboard${badge}</a>`
        : `<a href="tourist-dashboard.html" class="btn btn-outline btn-sm" style="color:var(--dark)"><i class="fa-solid fa-gauge"></i> Dashboard</a>`;
      const notifCount = (JSON.parse(localStorage.getItem('gt_notifications')||'[]')).filter(n=>(n.targetType===session.type||n.targetType==='all')&&!n.read).length;
      const notifBell = `<button id="nav-notif-btn" onclick="openNotifDropdown()" style="position:relative;display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;border:1px solid var(--border);color:var(--gray);background:white;cursor:pointer;transition:.15s;flex-shrink:0" title="Thông báo"><i class="fa-solid fa-bell" style="font-size:.9rem"></i>${notifCount>0?`<span style="position:absolute;top:-4px;right:-4px;background:#EF4444;color:white;font-size:.6rem;font-weight:800;min-width:16px;height:16px;border-radius:99px;display:flex;align-items:center;justify-content:center;padding:0 3px;border:2px solid white">${notifCount>9?'9+':notifCount}</span>`:''}</button>`;
      const roleLabel = session.type === 'guide' ? t('nav.guide_label') : t('nav.customer');
      const avatarHtml = session.avatar
        ? `<img src="${session.avatar}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;border:2px solid var(--border);flex-shrink:0">`
        : `<span style="width:32px;height:32px;border-radius:50%;background:var(--blue);color:white;font-weight:800;font-size:.85rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid var(--border)">${(session.name||'?')[0].toUpperCase()}</span>`;
      navRight.innerHTML = `
        ${langToggle}
        <span style="display:flex;align-items:center;gap:8px;font-size:.82rem;color:var(--gray);font-weight:500">${avatarHtml}<span><span style="display:block;font-size:.7rem;color:var(--gray-2);font-weight:400;line-height:1.2">${roleLabel}</span>${session.name}</span></span>
        ${dashLink}
        <button class="btn btn-sm" style="background:#FEF2F2;color:#DC2626;border:1px solid #FECACA" onclick="Auth.logout()"><i class="fa-solid fa-right-from-bracket"></i> <span data-i18n="nav.logout"></span></button>
        ${notifBell}`;
    } else {
      navRight.innerHTML = `
        ${langToggle}
        <a href="login.html" class="btn btn-outline btn-sm" style="color:var(--dark)"><i class="fa-solid fa-right-to-bracket"></i> <span data-i18n="nav.login"></span></a>
        <a href="login.html" class="btn btn-outline btn-sm" style="color:var(--dark)"><i class="fa-solid fa-id-card"></i> <span data-i18n="nav.become_guide"></span></a>
        <a href="request.html" class="btn btn-orange"><i class="fa-solid fa-paper-plane"></i> <span data-i18n="nav.post_request"></span></a>`;
    }
    // Mark active lang
    const cur = localStorage.getItem('gt_lang') || 'vi';
    navRight.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active-lang', b.dataset.lang === cur);
    });
    // Inject auth buttons into mob-panel
    const mobPanel = document.querySelector('.mob-panel');
    if (mobPanel && !mobPanel.querySelector('.mob-auth-area')) {
      const authArea = document.createElement('div');
      authArea.className = 'mob-auth-area';
      authArea.style.cssText = 'margin-top:8px;display:flex;flex-direction:column;gap:8px;padding:12px 0 0';
      const divEl = document.createElement('div');
      divEl.className = 'mob-divider';
      if (session) {
        const mobRoleLabel = session.type === 'guide' ? t('nav.guide_label') : t('nav.customer');
        const mobAvatarHtml = session.avatar
          ? `<img src="${session.avatar}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid var(--border)">`
          : `<span style="width:36px;height:36px;border-radius:50%;background:var(--blue);color:white;font-weight:800;font-size:.9rem;display:flex;align-items:center;justify-content:center">${(session.name||'?')[0].toUpperCase()}</span>`;
        authArea.innerHTML = `
          <div style="padding:10px 14px;font-size:.88rem;color:var(--gray);display:flex;align-items:center;gap:10px">${mobAvatarHtml}<span><span style="display:block;font-size:.72rem;color:var(--gray-2);font-weight:400;line-height:1.2">${mobRoleLabel}</span>${session.name}</span></div>
          <a href="${session.type==='guide'?'hdv-dashboard.html':'tourist-dashboard.html'}" style="padding:11px 14px;border-radius:var(--radius-sm);font-size:.95rem;font-weight:500;color:var(--dark);display:flex;align-items:center;gap:10px"><i class="fa-solid fa-gauge" style="width:18px;text-align:center"></i> Dashboard</a>
          <button onclick="Auth.logout()" style="padding:11px 14px;border-radius:var(--radius-sm);font-size:.95rem;font-weight:500;color:#DC2626;display:flex;align-items:center;gap:10px;background:none;border:none;cursor:pointer;text-align:left;width:100%"><i class="fa-solid fa-right-from-bracket" style="width:18px;text-align:center"></i> Đăng xuất</button>`;
      } else {
        authArea.innerHTML = `
          <a href="login.html" style="padding:11px 14px;border-radius:var(--radius-sm);font-size:.95rem;font-weight:500;color:var(--dark);display:flex;align-items:center;gap:10px"><i class="fa-solid fa-right-to-bracket" style="width:18px;text-align:center"></i> Đăng nhập</a>
          <a href="login.html" style="padding:11px 14px;border-radius:var(--radius-sm);font-size:.95rem;font-weight:500;color:var(--dark);display:flex;align-items:center;gap:10px"><i class="fa-solid fa-id-card" style="width:18px;text-align:center"></i> Làm HDV</a>
          <a href="request.html" style="padding:10px 14px;border-radius:var(--radius-sm);font-size:.95rem;font-weight:600;color:white;background:var(--orange);display:flex;align-items:center;gap:10px"><i class="fa-solid fa-paper-plane" style="width:18px;text-align:center"></i> Đăng yêu cầu</a>`;
      }
      mobPanel.appendChild(divEl);
      mobPanel.appendChild(authArea);
    }
    // Translate newly injected data-i18n elements
    if (typeof applyLang === 'function') applyLang();
    // Seed demo notifications
    if (!localStorage.getItem('gt_notifications')) {
      localStorage.setItem('gt_notifications', JSON.stringify([
        { id:'N_PROMO1', type:'promo', title:'Ưu đãi hè 2024', body:'Đặt tour từ nay đến 30/6 giảm 10% phí dịch vụ. Áp dụng mọi điểm đến.', targetType:'all', time:new Date(Date.now()-86400000*2).toISOString(), read:false, actionUrl:null },
        { id:'N_POL1', type:'policy', title:'Cập nhật chính sách hoàn tiền', body:'Chính sách hoàn tiền mới hiệu lực 01/05/2024. Hủy trước 48h được hoàn 100%.', targetType:'all', time:new Date(Date.now()-86400000*5).toISOString(), read:false, actionUrl:null },
      ]));
    }
  }
}

function openNotifDropdown() {
  const existing = document.getElementById('notif-dropdown');
  if (existing) { existing.remove(); return; }
  const session = Auth.session();
  if (!session) return;
  const all = JSON.parse(localStorage.getItem('gt_notifications') || '[]');
  const mine = all.filter(n => n.targetType === session.type || n.targetType === 'all');
  all.forEach(n => { if (n.targetType === session.type || n.targetType === 'all') n.read = true; });
  localStorage.setItem('gt_notifications', JSON.stringify(all));
  SB.markNotifsRead(mine.map(n => n.id));
  const btn = document.getElementById('nav-notif-btn');
  if (btn) { const sp = btn.querySelector('span'); if (sp) sp.remove(); }
  if (typeof updateNotifBadge === 'function') updateNotifBadge();
  const iconMap = { message:'fa-comment-dots', booking:'fa-calendar-check', promo:'fa-tag', policy:'fa-file-contract', system:'fa-bell' };
  const colorMap = { message:'#DBEAFE;color:#2563EB', booking:'#D1FAE5;color:#059669', promo:'#FEF3C7;color:#D97706', policy:'#EDE9FE;color:#7C3AED', system:'#F1F5F9;color:#64748B' };
  const items = mine.length ? mine.slice(0,15).map(n => {
    const t = new Date(n.time);
    const ts = t.toLocaleString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit'});
    return `<div style="display:flex;gap:10px;padding:12px 16px;border-bottom:1px solid #F1F5F9;cursor:default">
      <div style="width:34px;height:34px;border-radius:50%;background:${colorMap[n.type]||'#F1F5F9;color:#64748B'};display:flex;align-items:center;justify-content:center;font-size:.8rem;flex-shrink:0"><i class="fa-solid ${iconMap[n.type]||'fa-bell'}"></i></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:.83rem;font-weight:600;color:#0F172A">${n.title}</div>
        <div style="font-size:.75rem;color:#64748B;margin-top:2px">${n.body}</div>
        <div style="font-size:.7rem;color:#94A3B8;margin-top:3px">${ts}</div>
      </div>
    </div>`;
  }).join('') : `<div style="padding:36px;text-align:center;color:#94A3B8;font-size:.85rem"><i class="fa-solid fa-bell-slash" style="font-size:1.8rem;display:block;margin-bottom:10px"></i>${t('notif.empty')}</div>`;
  const drop = document.createElement('div');
  drop.id = 'notif-dropdown';
  drop.style.cssText = 'position:fixed;right:16px;top:62px;width:340px;background:white;border:1px solid #E2E8F0;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,.13);z-index:9999;overflow:hidden';
  drop.innerHTML = `<div style="padding:13px 16px;border-bottom:1px solid #F1F5F9;display:flex;justify-content:space-between;align-items:center">
    <span style="font-weight:700;font-size:.9rem;color:#0F172A"><i class="fa-solid fa-bell" style="color:var(--blue);margin-right:6px"></i>${t('notif.title')}</span>
    <button onclick="document.getElementById('notif-dropdown').remove()" style="border:none;background:none;cursor:pointer;color:#94A3B8;font-size:1.2rem;line-height:1">&times;</button>
  </div>
  <div style="max-height:400px;overflow-y:auto">${items}</div>`;
  document.body.appendChild(drop);
  setTimeout(() => {
    document.addEventListener('click', function close(e) {
      const d = document.getElementById('notif-dropdown');
      if (d && !d.contains(e.target) && !document.getElementById('nav-notif-btn')?.contains(e.target)) {
        d.remove(); document.removeEventListener('click', close);
      }
    });
  }, 10);
}

// ===== COMMISSION CONFIG =====
const COMMISSION_TIERS = [
  { min: 30, key: 'tier.top',      color: '#F97316', bg: '#FFF7ED', border: '#F97316' },
  { min: 25, key: 'tier.featured', color: '#7C3AED', bg: '#F5F3FF', border: '#7C3AED' },
  { min: 20, key: 'tier.priority', color: '#0284C7', bg: '#E0F2FE', border: '#0284C7' },
];

function commissionTier(c) {
  return COMMISSION_TIERS.find(t => c >= t.min) || null;
}

// ===== GUIDE CARD BUILDER =====
function guideCard(g) {
  const tier = commissionTier(g.commission || 15);
  const tierBadge = tier
    ? `<div style="position:absolute;top:12px;left:12px;background:${tier.bg};color:${tier.color};border:1px solid ${tier.border};border-radius:99px;padding:4px 11px;font-size:.74rem;font-weight:700">${t(tier.key)}</div>`
    : '';
  const cardBorder = tier ? `border-color:${tier.border};box-shadow:0 0 0 2px ${tier.bg}` : '';

  return `
  <div class="guide-card" onclick="location.href='guide-profile.html?id=${g.id}'" style="${cardBorder}">
    <div class="guide-card-img">
      <img src="${g.coverImg}" alt="${g.name}" loading="lazy">
      ${tierBadge}
      ${g.verified ? `<div class="guide-verified"><i class="fa-solid fa-circle-check"></i> ${t('card.verified')}</div>` : ''}
    </div>
    <div class="guide-card-body">
      <div class="guide-card-top">
        <div>
          <div class="guide-name">${g.name}</div>
          <div class="guide-location"><i class="fa-solid fa-location-dot"></i> ${g.location}</div>
        </div>
        <div style="text-align:right">
          <div class="guide-rating"><i class="fa-solid fa-star"></i> ${g.rating}</div>
          <div class="guide-reviews">${g.reviews} ${t('card.reviews')}</div>
        </div>
      </div>
      <div class="guide-tags">
        ${g.specialties.slice(0,3).map(s => `<span class="tag tag-gray">${t('spec.'+s) || s}</span>`).join('')}
      </div>
      <div class="guide-card-footer">
        <div>
          <div class="guide-price-label">${t('card.from')}</div>
          <div class="guide-price">${fmtPrice(g.pricePerDay)} <span>${t('card.per_day')}</span></div>
        </div>
        <button class="btn btn-primary btn-sm">${t('card.view_profile')}</button>
      </div>
    </div>
  </div>`;
}

// ===== HOME PAGE =====
function initHome() {
  // Featured guides
  const grid = $('featured-guides');
  if (grid) grid.innerHTML = GUIDES.slice(0, 4).map(guideCard).join('');
  // Search
  const form = $('hero-search');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const q = form.querySelector('input').value.trim();
    if (q) location.href = `guides.html?q=${encodeURIComponent(q)}`;
    else location.href = 'guides.html';
  });
  // Dest pills
  document.querySelectorAll('.dest-pill').forEach(p => {
    p.addEventListener('click', () => {
      location.href = `guides.html?region=${p.dataset.region}`;
    });
  });
  // Dest cards
  document.querySelectorAll('.dest-card[data-region]').forEach(c => {
    c.addEventListener('click', () => location.href = `guides.html?region=${c.dataset.region}`);
  });
  // Stats counter
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = target / 50;
    const io = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) return;
      const t = setInterval(() => {
        cur = Math.min(cur + step, target);
        el.textContent = target >= 1000 ? Math.round(cur / 100) / 10 + 'K+' : Math.round(cur) + '+';
        if (cur >= target) clearInterval(t);
      }, 20);
      io.unobserve(el);
    });
    io.observe(el);
  });
}

// ===== GUIDES LIST PAGE =====
let gFilters = { region: '', priceMax: 2000000, rating: '', sort: 'popular', search: '', lang: '' };

async function initGuidesPage() {
  const params = new URLSearchParams(location.search);
  if (params.get('region')) { gFilters.region = params.get('region'); const s = $('filter-region'); if (s) s.value = params.get('region'); }
  renderGuides();
  // Sync approved HDV từ Supabase để hiện trên thiết bị khác
  if (typeof sb !== 'undefined') {
    try {
      const { data: sbProfiles } = await sb.from('hdv_profiles').select('data, status').eq('status', 'approved');
      if (sbProfiles && sbProfiles.length) {
        const local = JSON.parse(localStorage.getItem('gt_hdv_profiles') || '[]');
        let changed = false;
        sbProfiles.forEach(row => {
          const p = { ...row.data, status: row.status };
          const i = local.findIndex(x => x.email === p.email);
          if (i > -1) { local[i] = p; } else { local.push(p); changed = true; }
          if (i === -1) changed = true;
        });
        if (changed) { localStorage.setItem('gt_hdv_profiles', JSON.stringify(local)); renderGuides(); }
      }
    } catch(e) {}
  }
  $('filter-region')?.addEventListener('change', e => { gFilters.region = e.target.value; renderGuides(); });
  $('filter-price')?.addEventListener('input', e => {
    gFilters.priceMax = parseInt(e.target.value);
    const d = $('price-disp'); if (d) d.textContent = fmtPrice(gFilters.priceMax);
    renderGuides();
  });
  $('filter-rating')?.addEventListener('change', e => { gFilters.rating = e.target.value; renderGuides(); });
  $('sort-guides')?.addEventListener('change', e => { gFilters.sort = e.target.value; renderGuides(); });
  $('filter-search')?.addEventListener('input', e => { gFilters.search = e.target.value.trim(); renderGuides(); });
  $('filter-lang')?.addEventListener('change', e => { gFilters.lang = e.target.value; renderGuides(); });
  $('btn-reset')?.addEventListener('click', () => {
    gFilters = { region: '', priceMax: 2000000, rating: '', sort: 'popular', search: '', lang: '' };
    const fr = $('filter-region'); if (fr) fr.value = '';
    const fp = $('filter-price'); if (fp) { fp.value = 2000000; const d = $('price-disp'); if (d) d.textContent = fmtPrice(2000000); }
    const fra = $('filter-rating'); if (fra) fra.value = '';
    const fs = $('filter-search'); if (fs) fs.value = '';
    const fl = $('filter-lang'); if (fl) fl.value = '';
    renderGuides();
  });
}

function getFilteredGuides() {
  const localProfiles = JSON.parse(localStorage.getItem('gt_hdv_profiles') || '[]')
    .filter(p => p.status === 'approved' && !GUIDES.find(g => g.email === p.email))
    .map(p => ({
      ...p,
      coverImg: p.coverImg || 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800&q=80',
      reviews: p.reviews || 0, trips: p.trips || 0, rating: p.rating || 0,
      responseTime: p.responseTime || '',
      specialties: p.specialties || [], languages: p.languages || [],
      regions: p.regions || [p.region].filter(Boolean), reviewList: [], itineraries: [],
    }));
  const guideStatusMap = JSON.parse(localStorage.getItem('gt_guide_status') || '{}');
  let list = [...GUIDES, ...localProfiles].filter(g => {
    const st = guideStatusMap[String(g.id)];
    const localOk = !st || st.status === 'active';
    const profileOk = !g.accountStatus || g.accountStatus === 'active';
    return localOk && profileOk;
  });
  if (gFilters.search) list = list.filter(g => (g.name||'').toLowerCase().includes(gFilters.search.toLowerCase()));
  if (gFilters.region) list = list.filter(g => g.regions.includes(gFilters.region));
  if (gFilters.lang) list = list.filter(g => g.languages.includes(gFilters.lang));
  list = list.filter(g => g.pricePerDay <= gFilters.priceMax);
  if (gFilters.rating) list = list.filter(g => g.rating >= parseFloat(gFilters.rating));
  if (gFilters.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  else if (gFilters.sort === 'price-asc') list.sort((a, b) => a.pricePerDay - b.pricePerDay);
  else if (gFilters.sort === 'price-desc') list.sort((a, b) => b.pricePerDay - a.pricePerDay);
  // Mặc định: sắp xếp theo hoa hồng (cao → thấp), bằng nhau thì xét đánh giá
  else list.sort((a, b) => (b.commission || 15) - (a.commission || 15) || b.rating - a.rating);
  return list;
}

function skeletonCard() {
  return `<div class="guide-card skeleton-card">
    <div class="skeleton skeleton-img"></div>
    <div class="guide-card-body">
      <div class="skeleton skeleton-line w60"></div>
      <div class="skeleton skeleton-line w40"></div>
      <div style="display:flex;gap:6px;margin:10px 0">
        <div class="skeleton skeleton-line" style="width:60px;height:22px;border-radius:99px"></div>
        <div class="skeleton skeleton-line" style="width:60px;height:22px;border-radius:99px"></div>
      </div>
      <div class="skeleton skeleton-line w80"></div>
    </div>
  </div>`;
}

function renderGuides() {
  const grid = $('guides-grid');
  const info = $('result-info');
  if (!grid) return;
  grid.innerHTML = Array(6).fill(skeletonCard()).join('');
  setTimeout(() => {
  const list = getFilteredGuides();
  if (info) info.innerHTML = `<strong>${list.length}</strong> ${t('guides.count_suffix')}`;
  if (!list.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 0">
      <i class="fa-solid fa-user-slash" style="font-size:2.5rem;color:var(--border);margin-bottom:14px;display:block"></i>
      <h3 style="color:var(--dark)">${t('guides.no_result')}</h3>
      <p>${t('guides.no_result_sub')}</p></div>`;
    return;
  }
  grid.innerHTML = list.map(guideCard).join('');
  }, 180);
}

// ===== GUIDE PROFILE PAGE =====
function fmtResponseTime(str) {
  if (!str) return '';
  if ((localStorage.getItem('gt_lang') || 'vi') === 'en') {
    return str.replace('giờ', 'h').replace('phút', 'min').replace('ngày', 'day');
  }
  return str;
}

function initProfile() {
  const params = new URLSearchParams(location.search);
  const idRaw = params.get('id');
  const idNum = parseInt(idRaw);
  let g = GUIDES.find(x => x.id === idNum);
  if (!g) {
    const localProfiles = JSON.parse(localStorage.getItem('gt_hdv_profiles') || '[]');
    g = localProfiles.find(p => p.id === idRaw);
  }
  if (!g) { location.href = 'guides.html'; return; }
  // Ensure safe defaults for self-registered guides
  if (!g.responseTime) g.responseTime = '';
  if (!g.pricePerDay) g.pricePerDay = 0;
  renderProfile(g);
  initBookingForm(g);
}

function renderProfile(g) {
  document.title = g.name + ' - GuideTravel';
  const set = (id, val) => { const el = $(id); if (el) el.textContent = val; };
  const setHTML = (id, val) => { const el = $(id); if (el) el.innerHTML = val; };
  const lang = localStorage.getItem('gt_lang') || 'vi';

  set('p-name', g.name);
  set('p-location', g.location);
  set('p-rating', `${g.rating} (${g.reviews} ${t('card.reviews')})`);
  set('p-exp', g.experience + ' ' + t('card.experience'));
  set('p-response', fmtResponseTime(g.responseTime));

  // Work days
  const wdStore = JSON.parse(localStorage.getItem('gt_work_days') || '{}');
  const wdDays = (g.workDays && g.workDays.length) ? g.workDays : (wdStore[g.email] || []);
  if (wdDays.length) {
    const order = [1,2,3,4,5,6,0];
    setHTML('p-workdays', order.filter(d => wdDays.includes(d)).map(d => `<span class="tag tag-blue" style="font-size:.72rem;padding:2px 8px">${t('cal.d'+d)}</span>`).join(''));
    const wdWrap = $('p-workdays-wrap');
    if (wdWrap) wdWrap.style.display = '';
  }

  set('p-bio', (lang === 'en' && g.bioEn) ? g.bioEn : g.bio);
  const allLocalReqs = JSON.parse(localStorage.getItem('gt_requests') || '[]');
  const completedStatuses = new Set(['done', 'awaiting_payment', 'paid']);
  const doneTrips = allLocalReqs.filter(r => String(r.guideId) === String(g.id) && completedStatuses.has(r.status)).length;
  const totalTrips = Math.max(doneTrips, g.trips || 0);
  set('p-trips', totalTrips > 0 ? totalTrips + '+' : '0');
  set('p-reviews-count', g.reviews);
  set('p-price-from', fmtPrice(g.pricePerDay));
  set('sb-price', fmtPrice(g.pricePerDay));

  const ava = $('p-avatar'); if (ava) { ava.src = g.avatar; ava.alt = g.name; }
  const cover = $('p-cover'); if (cover) { cover.src = g.coverImg; cover.alt = g.name; }

  setHTML('p-langs', (g.languages || []).map(l => `<span class="tag tag-blue">${l}</span>`).join(''));
  setHTML('p-specs', (g.specialties || []).map(s => `<span class="tag tag-gray">${t('spec.' + s) || s}</span>`).join(''));
  setHTML('p-verified', g.verified ? `<span class="tag tag-green"><i class="fa-solid fa-circle-check"></i> ${t('card.verified')}</span>` : '');

  // Itineraries
  setHTML('p-itineraries', (g.sampleItineraries || []).map(it => {
    const itTitle = (lang === 'en' && it.titleEn) ? it.titleEn : it.title;
    const itDesc  = (lang === 'en' && it.descEn)  ? it.descEn  : it.desc;
    return `
    <div class="itinerary-sample">
      <div class="itin-header">
        <strong>${itTitle}</strong>
        <div class="itin-meta">
          <span class="tag tag-blue">${it.days} ${t('unit.days')}</span>
          <span style="font-weight:700;color:var(--blue)">${fmtPrice(it.price)}</span>
        </div>
      </div>
      <div class="itin-body">${itDesc}</div>
    </div>`;
  }).join(''));

  // Reviews — merge hardcoded + user-submitted
  function buildReviewHTML(localRevs) {
    const uRevs = localRevs.filter(rv => rv.guideName === g.name).map(rv => ({
      name: rv.touristName || t('review.you') || 'Khách',
      date: new Date(rv.createdAt).toLocaleDateString('vi-VN'),
      stars: rv.stars,
      text: rv.text || ''
    }));
    const combined = [...uRevs, ...(g.reviewList || [])];
    set('p-reviews-count', combined.length);
    if (combined.length) {
      const avgRating = (combined.reduce((s, r) => s + r.stars, 0) / combined.length).toFixed(1);
      set('p-rating', `${avgRating} (${combined.length} ${t('card.reviews')})`);
    }
    return combined.map(r => `
    <div class="review-item">
      <div class="review-top">
        <div class="reviewer">
          <div class="reviewer-ava">${r.name[0]}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-date">${r.date}</div>
          </div>
        </div>
        <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      </div>
      <div class="review-text">${r.text}</div>
    </div>`).join('');
  }
  setHTML('p-reviews', buildReviewHTML(JSON.parse(localStorage.getItem('gt_my_reviews') || '[]')));
  if (typeof sb !== 'undefined') {
    SB.getReviewsByGuide(g.name).then(sbRevs => {
      if (!sbRevs || !sbRevs.length) return;
      const local = JSON.parse(localStorage.getItem('gt_my_reviews') || '[]');
      const idSet = new Set(local.map(r => r.id));
      const newRevs = sbRevs.filter(r => !idSet.has(r.id));
      if (!newRevs.length) return;
      newRevs.forEach(r => local.unshift(r));
      localStorage.setItem('gt_my_reviews', JSON.stringify(local));
      setHTML('p-reviews', buildReviewHTML(local));
    });
  }

  // Page title
  const pt = $('page-title'); if (pt) pt.textContent = g.name;
}

function initBookingForm(g) {
  const form = $('booking-form');
  if (!form) return;
  const ppl = $('bf-people');
  const days = $('bf-days');
  const totalEl = $('bf-total');
  function updateTotal() {
    const n = parseInt(ppl?.value || 1);
    const d = parseInt(days?.value || 1);
    if (totalEl) totalEl.textContent = fmtPrice(g.pricePerDay * d);
  }
  ppl?.addEventListener('change', updateTotal);
  days?.addEventListener('change', updateTotal);
  updateTotal();
  window.addEventListener('langchange', updateTotal);
  form.addEventListener('submit', e => {
    e.preventDefault();
    const termsCheck = form.querySelector('#bf-terms');
    if (termsCheck && !termsCheck.checked) { toast(t('login.err.terms'), 'err'); return; }
    const date = form.querySelector('#bf-date')?.value;
    if (!date) { toast(t('err.select_date'), 'err'); return; }
    const session = Auth.session();
    if (!session || session.type !== 'tourist') {
      toast(t('err.login_required'), 'err');
      setTimeout(() => { location.href = 'login.html'; }, 1500);
      return;
    }
    const d = parseInt(days?.value || 1);
    const p = parseInt(ppl?.value || 1);
    const req = {
      id: 'GT' + Date.now().toString().slice(-8),
      guideId: g.id,
      guideName: g.name,
      userId: session.id || null,
      name: session.name || '',
      phone: session.phone || '',
      email: session.email || '',
      destination: g.area || '',
      date, days: d, people: p,
      notes: '',
      totalAmount: g.pricePerDay * d,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    DB.addRequest(req);
    toast(t('booking.sent'), 'ok');
    setTimeout(() => { location.href = 'tourist-dashboard.html'; }, 1500);
  });
}

// ===== REQUEST PAGE =====
let selectedInterests = [];

function initRequestPage() {
  const reqSession = Auth.session();
  if (!reqSession || reqSession.type !== 'tourist') {
    location.href = 'login.html?redirect=' + encodeURIComponent('request.html' + location.search);
    return;
  }
  const params = new URLSearchParams(location.search);
  const guideIdRaw = params.get('guideId');
  const guideIdNum = parseInt(guideIdRaw);
  let guide = GUIDES.find(g => g.id === guideIdNum);
  if (!guide && guideIdRaw) {
    const localProfiles = JSON.parse(localStorage.getItem('gt_hdv_profiles') || '[]');
    guide = localProfiles.find(p => p.id === guideIdRaw);
  }

  // Render guide mini card
  if (guide) {
    const gc = $('req-guide-card');
    if (gc) gc.innerHTML = `
      <div class="guide-mini" onclick="location.href='guide-profile.html?id=${guide.id}'">
        <div class="guide-mini-img"><img src="${guide.avatar}" alt="${guide.name}"></div>
        <div>
          <div class="guide-mini-name">${guide.name}</div>
          <div class="guide-mini-loc">${guide.location}</div>
        </div>
        <div class="guide-mini-rating"><i class="fa-solid fa-star"></i> ${guide.rating}</div>
      </div>`;
    const gn = $('req-guide-name'); if (gn) gn.textContent = guide.name;
    // Pre-fill hidden fields
    const gid = $('req-guide-id'); if (gid) gid.value = guide.id;
    const gnf = $('req-guide-name-f'); if (gnf) gnf.value = guide.name;
  }

  // Pre-fill from session if logged in
  const session = Auth.session();
  if (session && session.type === 'tourist') {
    const nameEl = $('req-name'); if (nameEl && !nameEl.value) nameEl.value = session.name || '';
    const emailEl = $('req-email'); if (emailEl && !emailEl.value) emailEl.value = session.email || '';
    const phoneEl = $('req-phone'); if (phoneEl && !phoneEl.value) phoneEl.value = session.phone || '';
  }

  // Pre-fill from params
  const dateEl = $('req-date'); if (dateEl && params.get('date')) dateEl.value = params.get('date');
  const daysEl = $('req-days'); if (daysEl && params.get('days')) daysEl.value = params.get('days');
  const pplEl = $('req-people'); if (pplEl && params.get('people')) pplEl.value = params.get('people');

  // Min date
  const minDate = new Date().toISOString().split('T')[0];
  if (dateEl) dateEl.min = minDate;

  // Interests
  document.querySelectorAll('.interest-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.dataset.val;
      const idx = selectedInterests.indexOf(val);
      if (idx > -1) selectedInterests.splice(idx, 1); else selectedInterests.push(val);
      btn.classList.toggle('sel', selectedInterests.includes(val));
    });
  });

  // Show all guides if no guideId
  if (!guideId) renderSideGuides();

  // Submit
  $('request-form')?.addEventListener('submit', submitRequest);
}

function renderSideGuides() {
  const el = $('side-guides');
  if (!el) return;
  el.innerHTML = GUIDES.slice(0, 4).map(g => `
    <div class="guide-mini" onclick="location.href='guide-profile.html?id=${g.id}'">
      <div class="guide-mini-img"><img src="${g.avatar}" alt="${g.name}"></div>
      <div>
        <div class="guide-mini-name">${g.name}</div>
        <div class="guide-mini-loc">${g.location}</div>
      </div>
      <div class="guide-mini-rating"><i class="fa-solid fa-star"></i> ${g.rating}</div>
    </div>`).join('');
}

function submitRequest(e) {
  e.preventDefault();
  const _sess = Auth.session();
  if (_sess && _sess.type === 'guide') {
    toast('Tài khoản HDV không thể đặt tour. Vui lòng dùng tài khoản khách.', 'err');
    return;
  }
  const form = e.target;
  // Validate
  let ok = true;
  [['req-name', 'err-name', v => v.trim().length >= 2],
   ['req-phone', 'err-phone', v => /^[0-9]{10,11}$/.test(v.trim())],
   ['req-email', 'err-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())],
   ['req-dest', 'err-dest', v => !!v],
   ['req-date', 'err-date', v => !!v],
  ].forEach(([fid, eid, check]) => {
    const f = $(fid); const err = $(eid);
    if (!f) return;
    const valid = check(f.value);
    f.classList.toggle('err', !valid);
    if (err) err.classList.toggle('show', !valid);
    if (!valid) ok = false;
  });
  if (!ok) { toast(t('err.fill_form'), 'err'); return; }

  const destSlug = $('req-dest')?.value || '';
  const req = {
    id: 'GT' + Date.now().toString().slice(-8),
    guideId: $('req-guide-id')?.value || null,
    guideName: $('req-guide-name-f')?.value || t('req.all_guides'),
    userId: Auth.session()?.id || null,
    name: $('req-name').value,
    phone: $('req-phone').value,
    email: $('req-email').value,
    destSlug,
    destination: AREA_LABELS[destSlug] || destSlug,
    date: $('req-date').value,
    days: $('req-days')?.value || 1,
    people: $('req-people')?.value || 1,
    budget: rawVND($('req-budget')),
    hdvRate: rawVND($('req-hdv-rate')),
    interests: selectedInterests,
    notes: $('req-notes')?.value || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  DB.addRequest(req);
  // Gửi email thông báo cho HDV
  if (typeof emailjs !== 'undefined' && req.guideId) {
    const guide = GUIDES.find(g => String(g.id) === String(req.guideId));
    const guideEmail = guide?.email || '';
    if (guideEmail) {
      emailjs.send('service_tzjy78t', 'template_iwllqga', {
        to_email: guideEmail,
        guide_name: guide?.name || 'HDV',
        tourist_name: req.name,
        destination: req.destination,
        date: req.date,
        days: req.days,
        people: req.people,
        notes: req.notes || '—'
      }).catch(() => {});
    }
  }
  $('request-form-section')?.classList.add('hidden');
  const ss = $('request-success-section');
  if (ss) ss.classList.remove('hidden');
  const codeEl = $('req-code'); if (codeEl) codeEl.textContent = req.id;
  window.scrollTo(0, 0);
}

function initRequestSuccess() {
  const params = new URLSearchParams(location.search);
  if (!params.get('success')) return;
  $('request-form-section')?.classList.add('hidden');
  $('request-success-section')?.classList.remove('hidden');
  const code = $('req-code'); if (code) code.textContent = params.get('code');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  const pg = page();
  if (pg === 'index.html' || pg === '') initHome();
  else if (pg === 'guides.html') initGuidesPage();
  else if (pg === 'guide-profile.html') initProfile();
  else if (pg === 'request.html') { initRequestPage(); initRequestSuccess(); }
  else if (pg === 'payment.html' || pg === 'login.html' || pg === 'hdv-dashboard.html') { /* handled inline */ }

  // Re-render on language change
  window.addEventListener('langchange', () => {
    if (pg === 'index.html' || pg === '') initHome();
    else if (pg === 'guides.html') renderGuides();
    else if (pg === 'guide-profile.html') initProfile();
    // Re-apply data-i18n on all pages
    if (typeof applyLang === 'function') applyLang();
  });
});

// Active lang button style
const _langStyle = document.createElement('style');
_langStyle.textContent = '.lang-btn.active-lang{background:var(--blue)!important;color:white!important}';
document.head.appendChild(_langStyle);

// Redirect to login.html when Supabase fires PASSWORD_RECOVERY on any page
if (typeof sb !== 'undefined') {
  sb.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY' && page() !== 'login.html') {
      location.href = 'login.html';
    }
  });
}
