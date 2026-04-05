const commandCatalog = [
  { name: 'help', description: 'Duyệt các danh mục lệnh với giải thích ngắn về từng lệnh.', category: 'Thông tin', aliases: ['h', 'commands'], cooldown: 5, ownerOnly: false, slash: true },
  { name: 'ping', description: 'Kiểm tra độ trễ mạng và nhịp hoạt động của Zenith.', category: 'Thông tin', aliases: ['latency', 'p'], cooldown: 0, ownerOnly: false, slash: true },
  { name: 'serverinfo', description: 'Hiển thị tổng quan nhanh về server hiện tại.', category: 'Thông tin', aliases: ['guildinfo', 'si'], cooldown: 5, ownerOnly: false, slash: true },
  { name: 'userinfo', description: 'Hiển thị thông tin hồ sơ và chi tiết server của một người dùng.', category: 'Thông tin', aliases: ['ui', 'whois'], cooldown: 5, ownerOnly: false, slash: true },
  { name: 'ban', description: 'Cấm một người dùng khỏi server.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'case', description: 'Xem hoặc cập nhật một case moderation.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'clearwarns', description: 'Xóa tất cả cảnh cáo của một người dùng.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'dm', description: 'Gửi tin nhắn trực tiếp cho một người dùng.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'kick', description: 'Đá một người dùng khỏi server.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'lock', description: 'Khóa kênh hiện tại.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'massban', description: 'Cấm nhiều ID người dùng cùng lúc.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'nuke', description: 'Clone và reset kênh hiện tại.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'purge', description: 'Xóa hàng loạt tin nhắn gần đây.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'timeout', description: 'Tạm thời đưa một thành viên vào timeout.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'unban', description: 'Gỡ cấm một người dùng bằng ID.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'unlock', description: 'Mở khóa kênh hiện tại.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'untimeout', description: 'Gỡ timeout khỏi một thành viên.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'warn', description: 'Thêm hoặc xem cảnh cáo của một người dùng.', category: 'Moderation', aliases: [], cooldown: 3, ownerOnly: false, slash: true },
  { name: 'dok', description: 'Chạy các tiện ích Dokdo chỉ dành cho owner.', category: 'Chủ sở hữu', aliases: [], cooldown: 0, ownerOnly: true, slash: false },
  { name: 'nop', description: 'Quản lý quyền không cần prefix cho người dùng.', category: 'Chủ sở hữu', aliases: [], cooldown: 0, ownerOnly: true, slash: true },
  { name: 'avatar', description: 'Hiển thị avatar người dùng chất lượng cao.', category: 'Tiện ích', aliases: ['av', 'pfp'], cooldown: 4, ownerOnly: false, slash: true },
  { name: 'botstats', description: 'Hiển thị hiệu năng và thống kê sử dụng của bot.', category: 'Tiện ích', aliases: ['stats', 'aboutbot'], cooldown: 5, ownerOnly: false, slash: true },
  { name: 'roleinfo', description: 'Kiểm tra vai trò trong server và thông tin chi tiết của nó.', category: 'Tiện ích', aliases: ['ri'], cooldown: 5, ownerOnly: false, slash: true }
];

export default commandCatalog;
