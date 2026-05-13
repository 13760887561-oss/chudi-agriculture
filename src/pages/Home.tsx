import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { toast } from 'sonner'
import {
  Building2, Phone, Mail, MapPin, Droplets, Leaf, Settings, Users,
  Award, ArrowRight, CheckCircle, Zap, Shield, Clock
} from 'lucide-react'

// 演示数据 - 来自PDF内容
const demoCompanyInfo = {
  company_name: '锄地农业科技（肇庆市）有限公司',
  company_name_en: 'CUDY AGR. TECH',
  slogan: '让种植更高效',
  description: '锄地农业科技（肇庆市）有限公司始建于2013年，位于华南泥炭土之乡——肇庆市高要，是集研发、生产、销售为一体的专业化科技企业。公司致力于栽培基质领域并居于领先地位，以改良种植土壤为己任，以农业科技为基础，配合水肥一体化服务、无土栽培服务等先进现代农业科技，为顾客第一时间提供高品质产品、服务与思想。',
  address: '广东省肇庆市高要区南岸街道马安开发区',
  phone: '0758-8238666',
  email: 'becks_zhao@126.com',
  wechat: 'beckerchiu'
}

const demoStats = {
  years_experience: 10,
  team_size: 21,
  doctor_team: 4,
  service_area: 10000
}

const demoServices = [
  {
    id: 1,
    title: '栽培基质',
    description: '研发生产各类高品质栽培基质，包括育苗基质、水稻育秧基质、容器苗基质、盆栽专用基质等，适用于瓜果、花卉、蔬菜等多种作物。',
    icon: Leaf
  },
  {
    id: 2,
    title: '水肥一体化',
    description: '提供从设计到施工的一站式水肥一体化解决方案，实现水和肥料一体化利用和管理，节水40-50%，节肥30-50%。',
    icon: Droplets
  },
  {
    id: 3,
    title: '无土栽培',
    description: '提供专业的无土栽培技术方案和基质产品，适用于草莓、蓝莓、果蔬等多种作物，安全高效，性价比高。',
    icon: Settings
  },
  {
    id: 4,
    title: '农业服务',
    description: '提供从规划到建设施工再到农技服务的全流程农业服务支持，广泛适用于各种作物，累计服务超过一万亩。',
    icon: Users
  }
]

const demoProducts = [
  {
    id: 1,
    name: '育苗基质',
    description: '含椰糠、蛭石、珍珠岩复配，适用于瓜果、花卉、蔬菜',
    image: '/images/page_1_img_in_image_box_63_224_645_822.jpg'
  },
  {
    id: 2,
    name: '水稻育秧基质',
    description: '适用于机械上盘生产线，人工育秧',
    image: '/images/page_2_img_in_image_box_56_201_639_801.jpg'
  },
  {
    id: 3,
    name: '通用营养土',
    description: '适用于花卉、蔬菜、绿植等栽培',
    image: '/images/page_3_img_in_image_box_69_203_654_802.jpg'
  },
  {
    id: 4,
    name: '容器苗基质',
    description: '苗壮、根强、保水保肥、透气性佳',
    image: '/images/page_5_img_in_image_box_63_214_649_817.jpg'
  }
]

// 最新新闻数据
const latestNews = {
  title: '向广西贵港完成早稻育秧基质土突破1千立方',
  date: '2025年5月12日',
  summary: '近日，锄地农业科技有限公司向广西贵港主要粮食产区完成早稻水稻育秧生产基质土突破1千立方。',
  image: '/news-rice-substrate.jpg',
  content: `我司的水稻育秧基质土主要材料是泥炭土，质量稳定，天然腐熟不含病菌，含有高腐植酸和多孔结构。

产品特点：
• 基质土持水孔隙60%，透气孔隙30%
• 固液气三相平衡，保水透气
• 离子代换量高
• 秧苗根系发达，茎杆粗壮
• 壮苗指数G值大于0.4
• 苗期比一般对照的缩短了30%
• 插秧后次日返青`
}

const demoPartners = [
  { id: 1, name: '华南理工大学', description: '教学实习基地' },
  { id: 2, name: '广东省农业科学院', description: '技术协作单位' },
  { id: 3, name: '肇庆学院生科院', description: '人才培训基地' },
  { id: 4, name: '肇庆市农业学校', description: '人才实训基地' }
]

export default function HomePage() {
  const { user } = useAuth()
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      toast.error('请填写完整信息')
      return
    }

    setSubmitting(true)
    setTimeout(() => {
      toast.success('留言已发送，我们会尽快与您联系')
      setContactForm({ name: '', phone: '', email: '', message: '' })
      setSubmitting(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 right-0 bg-white/98 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="font-bold text-green-800">锄地农业科技</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-gray-600 hover:text-green-600 transition-colors">首页</a>
              <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors">关于我们</a>
              <a href="#services" className="text-gray-600 hover:text-green-600 transition-colors">产品服务</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">联系我们</a>
              {user ? (
                <Link to="/admin" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  管理后台
                </Link>
              ) : (
                <Link to="/admin/login" className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors">
                  登录
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 bg-green-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                华南泥炭土之乡 · 肇庆高要
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                {demoCompanyInfo.slogan}
                <span className="block text-green-600 text-3xl md:text-4xl mt-2">{demoCompanyInfo.company_name_en}</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {demoCompanyInfo.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#services" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
                  了解更多 <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium">
                  立即咨询
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-green-200 to-green-400 rounded-3xl flex items-center justify-center shadow-2xl">
                  <img src="/images/page_2_img_in_image_box_99_221_1008_898.jpg" alt="锄地农业科技" className="w-full h-full object-cover rounded-3xl" />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">专注基质领域</div>
                    <div className="font-bold text-gray-900">10年+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 数据统计 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-4xl font-bold text-green-600">{demoStats.years_experience}+</div>
              <div className="mt-2 text-gray-600 font-medium">年行业经验</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-4xl font-bold text-blue-600">{demoStats.team_size}+</div>
              <div className="mt-2 text-gray-600 font-medium">技术团队</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-4xl font-bold text-purple-600">{demoStats.doctor_team}+</div>
              <div className="mt-2 text-gray-600 font-medium">博士团队</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="text-4xl font-bold text-orange-600">{demoStats.service_area}+</div>
              <div className="mt-2 text-gray-600 font-medium">服务面积(亩)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 关于我们 */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">关于锄地农业科技</h2>
            <p className="mt-4 text-gray-600 text-lg">以改良种植土壤为己任，让种植更高效</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-3xl p-8">
                <img src="/images/page_2_img_in_image_box_1346_659_1752_915.jpg" alt="公司风采" className="w-full rounded-2xl shadow-lg" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-bold text-gray-900">成立于2013年</span>
                </div>
                <p className="text-sm text-gray-600">华南泥炭土之乡 · 肇庆市高要</p>
              </div>
            </div>
            <div>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                {demoCompanyInfo.description}
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                公司相继与广东省农业科学院、华南理工大学、肇庆学院生科院、肇庆市农业学校等科研机构建立技术协作关系和人才培养基地，被授予华南理工大学教学实习基地、肇庆市农业学校人才实训基地。
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                秉承"让种植更高效"的企业理念，将精益求精，不断创新，投入更多研发成本，品控管理成本，用农业科技创新和资源优势求发展，为缔造人类的可持续发展的绿色种植环境而奋斗。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">研发生产销售一体</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">基质领域领先</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">科研机构合作</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">服务万亩+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新闻动态 */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">新闻动态</h2>
            <p className="mt-4 text-gray-600">了解更多关于我们</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img src={latestNews.image} alt={latestNews.title} className="w-full h-64 md:h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 text-sm text-amber-600 mb-3">
                    <span className="px-3 py-1 bg-amber-100 rounded-full">最新消息</span>
                    <span>{latestNews.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{latestNews.title}</h3>
                  <p className="text-gray-600 mb-6">{latestNews.summary}</p>
                  <div className="text-sm text-gray-500 leading-relaxed whitespace-pre-line">
                    {latestNews.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 合作伙伴 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">战略合作伙伴</h2>
            <p className="mt-4 text-gray-600">与知名科研机构和农业企业携手共进</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {demoPartners.map((partner) => (
              <div key={partner.id} className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg hover:bg-white transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-2xl font-bold">{partner.name[0]}</span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg">{partner.name}</h3>
                <p className="mt-2 text-sm text-green-600 bg-green-50 inline-block px-3 py-1 rounded-full">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 核心业务 */}
      <section id="services" className="py-20 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">核心业务</h2>
            <p className="mt-4 text-green-100 text-lg">四大业务板块，覆盖农业全产业链</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoServices.map((service) => (
              <div key={service.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-green-100 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 产品展示 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">基质产品</h2>
            <p className="mt-4 text-gray-600">EVERFARM 品牌系列高品质栽培基质</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-gray-900 text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-500">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              获取更多产品信息 <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 水肥一体化 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                <Droplets className="w-4 h-4" />
                节水节肥增产
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">水肥一体化</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                水肥一体化技术又称为微灌施肥。该技术是借助微灌系统，将微灌和施肥结合，利用微灌系统中的水为载体，在灌溉的同时进行施肥，实现水和肥一体化利用和管理，使水和肥料在土壤中以优化的组合状态供应给作物吸收利用。
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-green-600">40-50%</div>
                  <div className="text-sm text-gray-600 mt-1">节水效果</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-blue-600">30-50%</div>
                  <div className="text-sm text-gray-600 mt-1">节肥效果</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-purple-600">20-30%</div>
                  <div className="text-sm text-gray-600 mt-1">增产效果</div>
                </div>
                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-orange-600">10年+</div>
                  <div className="text-sm text-gray-600 mt-1">使用寿命</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/page_5_img_in_image_box_104_337_793_842.jpg" alt="水肥一体化" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
              <img src="/images/page_5_img_in_image_box_834_336_1712_841.jpg" alt="灌溉系统" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
              <img src="/images/page_3_img_in_image_box_1061_171_1657_515.jpg" alt="工程案例" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
              <img src="/images/page_3_img_in_image_box_1058_558_1657_905.jpg" alt="安装施工" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Shield className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">核心技术</h4>
              <p className="text-sm text-gray-600">抗堵、防虹吸、压力补偿</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Settings className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">专业设计</h4>
              <p className="text-sm text-gray-600">设计团队+工程施工</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Users className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">技术培训</h4>
              <p className="text-sm text-gray-600">系统使用、养护培训</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <Leaf className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">农艺支持</h4>
              <p className="text-sm text-gray-600">专业农业指导服务</p>
            </div>
          </div>
        </div>
      </section>

      {/* 基质栽培农服 */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">基质栽培农服</h2>
            <p className="mt-4 text-gray-600">从规划到实施的全流程农业服务</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white text-2xl font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">规划服务</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                因应环境条件、市场需求，确定种植模式和农场定位。通常以生产型农场、观光型农场、科普型农场等作为农场定位，为草莓、番茄、西甜瓜、青瓜等作物提供专业基质栽培的规划服务。
              </p>
              <img src="/images/page_5_img_in_image_box_36_441_584_864.jpg" alt="规划服务" className="w-full rounded-xl" />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white text-2xl font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">建设施工</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                根据规划内容和预算，进行设施采购和工程施工，按每个农场的规划定位，投入预算，结合现场情况，提供最优的建设方案。广泛适用于各种作物，累计服务超过一万亩。
              </p>
              <img src="/images/page_5_img_in_image_box_626_441_1177_868.jpg" alt="建设施工" className="w-full rounded-xl" />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-white text-2xl font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">农技服务</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                生产过程中提供技术培训，病虫害防治，营养调配，农技托管等服务。通过与华南农业大学、广东省农科院、肇庆市农业学校等专业机构合作，拥有多项基质栽培的专利技术。
              </p>
              <img src="/images/page_5_img_in_image_box_1214_440_1761_869.jpg" alt="农技服务" className="w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 联系方式 */}
      <section id="contact" className="py-20 bg-gradient-to-br from-green-800 to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">联系我们</h2>
            <p className="mt-4 text-green-200 text-lg">期待与您携手共创智慧农业新篇章</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-6">联系方式</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="text-sm text-green-300">电子邮箱</div>
                    <div className="font-medium">{demoCompanyInfo.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                    <span className="text-green-300 text-xl">💬</span>
                  </div>
                  <div>
                    <div className="text-sm text-green-300">微信</div>
                    <div className="font-medium">{demoCompanyInfo.wechat}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="text-sm text-green-300">电话</div>
                    <div className="font-medium">{demoCompanyInfo.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl">
                  <div className="w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="text-sm text-green-300">地址</div>
                    <div className="font-medium">{demoCompanyInfo.address}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">在线留言</h3>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="您的姓名 *"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="联系电话 *"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      required
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="电子邮箱（选填）"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="留言内容 *"
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      发送中...
                    </>
                  ) : (
                    '提交留言'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-8 bg-green-950 text-green-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <span className="font-bold text-white">锄地农业科技</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">扫码联系：</span>
              <img src="/wechat-qr.png" alt="微信二维码" className="w-16 h-16 rounded-lg shadow-lg" />
            </div>
            <p>© {new Date().getFullYear()} 锄地农业科技（肇庆市）有限公司 | All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}