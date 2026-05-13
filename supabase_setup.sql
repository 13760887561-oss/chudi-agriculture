-- 锄地农业科技数据库表结构
-- 在Supabase SQL Editor中执行此脚本

-- 公司信息表
CREATE TABLE IF NOT EXISTS company_info (
  id SERIAL PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL DEFAULT '锄地农业科技（肇庆市）有限公司',
  company_name_en VARCHAR(255) DEFAULT 'Chudi Agricultural Technology',
  slogan TEXT,
  description TEXT,
  established_year INTEGER DEFAULT 2018,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(100),
  wechat VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 核心服务表
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 产品表
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  category VARCHAR(100),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 合作伙伴表
CREATE TABLE IF NOT EXISTS partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(100),
  logo_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 新闻动态表
CREATE TABLE IF NOT EXISTS news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT,
  summary TEXT,
  image_url TEXT,
  author VARCHAR(100),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 联系留言表
CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(100),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 网站统计表
CREATE TABLE IF NOT EXISTS site_stats (
  id SERIAL PRIMARY KEY,
  years_experience INTEGER DEFAULT 8,
  team_size INTEGER DEFAULT 100,
  doctor_team INTEGER DEFAULT 20,
  service_area INTEGER DEFAULT 2000,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 插入初始数据
INSERT INTO company_info (company_name, slogan, description, established_year, address, phone, email) VALUES
('锄地农业科技（肇庆市）有限公司', '科技兴农，智慧种地', '专注于智慧农业和水肥一体化技术推广', 2018, '广东省肇庆市', '0758-1234567', 'contact@chudi.com');

INSERT INTO site_stats (years_experience, team_size, doctor_team, service_area) VALUES
(8, 100, 20, 2000);

INSERT INTO services (title, description, icon, sort_order) VALUES
('智慧农业', '运用物联网和大数据技术，实现精准农业管理', 'cpu', 1),
('水肥一体化', '将灌溉与施肥完美结合，提高资源利用效率', 'droplets', 2),
('技术服务', '提供专业的农业技术咨询和解决方案', 'headphones', 3),
('设备供应', '供应高品质的农业智能设备', 'package', 4);

INSERT INTO products (name, description, category, sort_order) VALUES
('智能灌溉系统', '可根据土壤湿度自动调节灌溉量', '灌溉设备', 1),
('水肥一体机', '实现水和肥料的精准配比和施用', '施肥设备', 2),
('土壤传感器', '实时监测土壤温湿度和养分含量', '监测设备', 3),
('农业大数据平台', '集成数据采集、分析和决策支持', '软件平台', 4);

INSERT INTO partners (name, description, type, sort_order) VALUES
('中国农业大学', '农业科技创新合作伙伴', '学术机构', 1),
('华南农业大学', '技术研发合作伙伴', '学术机构', 2),
('广东省农业科学院', '区域农业技术支持', '研究机构', 3);

INSERT INTO news (title, summary, content, author, is_published) VALUES
('公司成立公告', '锄地农业科技正式成立，专注智慧农业发展', '锄地农业科技（肇庆市）有限公司正式成立...', '管理员', true),
('智慧农业研讨会', '探讨水肥一体化技术的应用前景', '近日，我司成功举办智慧农业技术研讨会...', '管理员', true);