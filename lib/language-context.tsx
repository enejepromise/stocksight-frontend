"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "ha" | "yo" | "ig"

export const translations = {
  en: {
    // Common
    appName: "StockSight",
    tagline: "Real-Time Inventory Management",
    subtitle: "Track your stock and sales in real-time. Never lose visibility of your business again.",
    getStarted: "Get Started",
    learnMore: "Learn More",

    // Language names
    english: "English",
    hausa: "Hausa",
    yoruba: "Yoruba",
    igbo: "Igbo",
    selectLanguage: "Select Language",

    // Welcome page
    heroTitle: "Know Your Stock. Control Your Business.",
    heroSubtitle:
      "The fastest way for shop owners to track inventory and sales—without stress or mistrust. Real-time visibility, absolute control.",
    trustedBy: "Trusted by 500+ shop owners across Nigeria",
    startFreeTrial: "Start Free Trial",
    watchDemo: "Watch Demo",

    // Problem section
    problemTitle: "Running a shop shouldn't be this stressful",
    problemSubtitle: "Shop owners face daily pains that cost time, money, and peace of mind",
    problems: {
      inventory: {
        title: "Inventory Chaos",
        description:
          "Not knowing exact stock levels. Stressful manual counting. Overstock or stockouts costing you money.",
      },
      money: {
        title: "Money Mystery",
        description: "Cash vs sales never match. Sales under-reported. No way to verify daily earnings.",
      },
      trust: {
        title: "Trust Issues",
        description: "No way to verify sales rep activities. Records can be manipulated. Can't monitor when away.",
      },
    },

    // Solution section
    solutionTitle: "Finally, complete visibility",
    solutionSubtitle:
      "StockSight gives you real-time control of your inventory and sales—even when you're not in the shop",

    // Features section
    featuresTitle: "Everything you need to run your shop confidently",
    features: {
      realTime: "Real-Time Tracking",
      realTimeDesc: "See stock updates instantly as sales are recorded",
      secure: "Secure & Tamper-Proof",
      secureDesc: "Role-based access with immutable audit logs",
      insights: "Smart Insights",
      insightsDesc: "Daily reports and low-stock alerts automatically",
      inventory: "Inventory Management",
      inventoryDesc: "Add stock, track quantities, cost prices, and selling prices",
      sales: "Sales Recording",
      salesDesc: "Simple daily sales entry with automatic calculations",
      reconciliation: "Daily Reconciliation",
      reconciliationDesc: "Compare expected cash vs received. Approve or dispute records",
      multiDevice: "Multi-Device Access",
      multiDeviceDesc: "Access your dashboard on phone or laptop, anywhere",
      alerts: "Smart Alerts",
      alertsDesc: "Low stock notifications so you never run out",
    },

    // How it works
    howItWorksTitle: "How StockSight Works",
    howItWorksSubtitle: "Get started in minutes, see results immediately",
    steps: {
      step1: {
        title: "Create Your Account",
        description: "Sign up as shop owner and set up your inventory",
      },
      step2: {
        title: "Add Your Products",
        description: "Enter products with quantities and prices",
      },
      step3: {
        title: "Invite Sales Reps",
        description: "Create accounts for your sales team",
      },
      step4: {
        title: "Track Everything",
        description: "Monitor stock, sales, and cash in real-time",
      },
    },

    // Pricing
    pricingTitle: "Simple, Transparent Pricing",
    pricingSubtitle: "Start free, upgrade as you grow",
    perMonth: "/month",
    mostPopular: "Most Popular",
    getStartedWith: "Get Started",
    tiers: {
      starter: {
        name: "Starter",
        price: "₦3,000",
        description: "Perfect for single shop owners",
        features: ["1 Shop", "Up to 500 products", "2 Sales rep accounts", "Daily reports", "Email support"],
      },
      business: {
        name: "Business",
        price: "₦8,000",
        description: "For growing businesses",
        features: [
          "Up to 3 branches",
          "Unlimited products",
          "10 Sales rep accounts",
          "Advanced analytics",
          "WhatsApp reports",
          "Priority support",
        ],
      },
      enterprise: {
        name: "Enterprise",
        price: "Custom",
        description: "For large operations",
        features: [
          "Unlimited branches",
          "Unlimited everything",
          "Custom integrations",
          "Dedicated support",
          "On-site training",
          "SLA guarantee",
        ],
      },
    },

    // CTA
    ctaTitle: "Ready to take control of your inventory?",
    ctaSubtitle: "Join 500+ shop owners who trust StockSight to run their business",

    // Footer
    product: "Product",
    company: "Company",
    support: "Support",
    legal: "Legal",
    about: "About Us",
    careers: "Careers",
    blog: "Blog",
    helpCenter: "Help Center",
    contact: "Contact",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    copyright: "© 2025 StockSight. All rights reserved.",

    // Auth common
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    businessName: "Business Name",
    phoneNumber: "Phone Number",

    // Login
    login: "Login",
    welcomeBack: "Welcome Back",
    loginSubtitle: "Sign in to access your dashboard",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    noAccount: "Don't have an account?",
    signUp: "Sign up",
    signingIn: "Signing in...",

    // Register
    register: "Register",
    createAccount: "Create Account",
    registerSubtitle: "Start managing your inventory today",
    agreeTerms: "I agree to the Terms of Service and Privacy Policy",
    hasAccount: "Already have an account?",
    signIn: "Sign in",
    creating: "Creating account...",

    // Password Reset
    resetPassword: "Reset Password",
    resetSubtitle: "Enter your email to receive a reset link",
    sendResetLink: "Send Reset Link",
    sending: "Sending...",
    backToLogin: "Back to login",
    resetSent: "Reset link sent!",
    checkEmail: "Check your email for the password reset link.",

    // Validation
    required: "This field is required",
    invalidEmail: "Please enter a valid email",
    passwordMin: "Password must be at least 8 characters",
    passwordMatch: "Passwords do not match",

    // Dashboard
    dashboard: "Dashboard",
    inventory: "Inventory",
    sales: "Sales",
    reports: "Reports",
    settings: "Settings",
    users: "Users",
    logout: "Logout",
    totalProducts: "Total Products",
    lowStock: "Low Stock",
    todaySales: "Today's Sales",
    totalRevenue: "Total Revenue",
    recentSales: "Recent Sales",
    topProducts: "Top Products",
    quickActions: "Quick Actions",
    addProduct: "Add Product",
    recordSale: "Record Sale",
    viewReports: "View Reports",
    manageUsers: "Manage Users",
  },
  ha: {
    // Common
    appName: "StockSight",
    tagline: "Sarrafa Kayayyaki na Lokaci-Lokaci",
    subtitle: "Bi diddigin kayayyaki da tallace-tallace a lokaci guda. Kada ku rasa ganin kasuwancinku.",
    getStarted: "Fara",
    learnMore: "Ƙara Koyo",

    // Language names
    english: "Turanci",
    hausa: "Hausa",
    yoruba: "Yarbanci",
    igbo: "Ibo",
    selectLanguage: "Zaɓi Harshe",

    // Welcome page
    heroTitle: "San Kayayyakin ku. Sarrafa Kasuwancin ku.",
    heroSubtitle:
      "Hanya mafi sauri don masu shago su bi diddigin kayayyaki da tallace-tallace—ba tare da damuwa ko rashin aminci ba. Gani na lokaci-lokaci, cikakken iko.",
    trustedBy: "Masu shago 500+ a duk faɗin Najeriya sun amince da shi",
    startFreeTrial: "Fara Gwaji Kyauta",
    watchDemo: "Kalli Demo",

    // Problem section
    problemTitle: "Gudanar da shago bai kamata ya zama mai wahala haka ba",
    problemSubtitle:
      "Masu shago suna fuskantar matsaloli kowace rana waɗanda ke ɓata lokaci, kuɗi, da kwanciyar hankali",
    problems: {
      inventory: {
        title: "Rikicin Kayayyaki",
        description:
          "Rashin sanin yawan kayayyaki daidai. Ƙidayar hannu mai wahala. Yawan kayayyaki ko ƙaranci yana ɓata kuɗi.",
      },
      money: {
        title: "Asirin Kuɗi",
        description:
          "Tsabar kuɗi da tallace-tallace ba su daidaita ba. Rahoton tallace-tallace ƙasa da ainihin. Babu hanyar tabbatar da yawan kuɗin rana.",
      },
      trust: {
        title: "Matsalolin Aminci",
        description:
          "Babu hanyar tabbatar da ayyukan ma'aikatan tallace-tallace. Za a iya sauya bayanan. Ba za ku iya lura lokacin da ba ku nan ba.",
      },
    },

    // Solution section
    solutionTitle: "A ƙarshe, cikakken gani",
    solutionSubtitle:
      "StockSight yana ba ku iko na lokaci-lokaci akan kayayyakin ku da tallace-tallace—ko da ba ku nan a shago ba",

    // Features section
    featuresTitle: "Duk abin da kuke buƙata don gudanar da shagon ku cikin kwarin gwiwa",
    features: {
      realTime: "Bibiyar Lokaci-Lokaci",
      realTimeDesc: "Ga sabuntawa kan kayayyaki nan take yayin da ake yin tallace-tallace",
      secure: "Amintacce & Mai Tsaro",
      secureDesc: "Samun dama bisa matsayi tare da bayanan bincike masu ƙarfi",
      insights: "Basirar Wayo",
      insightsDesc: "Rahotanni na yau da kullun da faɗakarwa kan ƙarancin kayayyaki",
      inventory: "Sarrafa Kayayyaki",
      inventoryDesc: "Ƙara kayayyaki, bi diddigin adadi, farashin siye, da farashin sayarwa",
      sales: "Yin Rikodin Tallace-tallace",
      salesDesc: "Shigar da tallace-tallace na kowace rana cikin sauƙi tare da lissafi ta atomatik",
      reconciliation: "Daidaita na Yau da Kullun",
      reconciliationDesc: "Kwatanta tsabar kuɗi da ake tsammani da abin da aka karɓa. Amince ko ƙi bayanan",
      multiDevice: "Shiga daga Na'urori da yawa",
      multiDeviceDesc: "Samun damar dashboard ɗinku akan waya ko kwamfuta, ko'ina",
      alerts: "Faɗakarwa Mai Wayo",
      alertsDesc: "Sanarwar ƙarancin kayayyaki don kada ku ƙare",
    },

    // How it works
    howItWorksTitle: "Yadda StockSight Ke Aiki",
    howItWorksSubtitle: "Fara a cikin mintuna, ga sakamako nan take",
    steps: {
      step1: {
        title: "Ƙirƙiri Asusun ku",
        description: "Yi rajista a matsayin mai shago kuma saita kayayyakin ku",
      },
      step2: {
        title: "Ƙara Kayayyakin ku",
        description: "Shigar da kayayyaki tare da adadi da farashi",
      },
      step3: {
        title: "Gayyaci Ma'aikatan Tallace-tallace",
        description: "Ƙirƙiri asusu ga ƙungiyar tallace-tallacen ku",
      },
      step4: {
        title: "Bi Diddigin Komai",
        description: "Lura da kayayyaki, tallace-tallace, da kuɗi a lokaci-lokaci",
      },
    },

    // Pricing
    pricingTitle: "Farashi Mai Sauƙi, Mai Gaskiya",
    pricingSubtitle: "Fara kyauta, haɓaka yayin da kuke girma",
    perMonth: "/wata",
    mostPopular: "Mafi Shahara",
    getStartedWith: "Fara",
    tiers: {
      starter: {
        name: "Farawa",
        price: "₦3,000",
        description: "Cikakke ga masu shago ɗaya",
        features: [
          "Shago 1",
          "Har zuwa kayayyaki 500",
          "Asusu 2 na ma'aikatan tallace-tallace",
          "Rahotanni na yau da kullun",
          "Tallafin Imel",
        ],
      },
      business: {
        name: "Kasuwanci",
        price: "₦8,000",
        description: "Don kasuwancin da ke girma",
        features: [
          "Har zuwa reshe 3",
          "Kayayyaki mara iyaka",
          "Asusu 10 na ma'aikatan tallace-tallace",
          "Bincike na ci gaba",
          "Rahotannin WhatsApp",
          "Tallafi na farko",
        ],
      },
      enterprise: {
        name: "Manyan Kamfanoni",
        price: "Keɓantacce",
        description: "Don manyan ayyuka",
        features: [
          "Rassan mara iyaka",
          "Komai mara iyaka",
          "Haɗin kai na musamman",
          "Tallafi na musamman",
          "Horo a wurin",
          "Tabbacin SLA",
        ],
      },
    },

    // CTA
    ctaTitle: "Shirye kuke don ɗaukar ikon kayayyakin ku?",
    ctaSubtitle: "Shiga cikin masu shago 500+ waɗanda suka amince da StockSight don gudanar da kasuwancinsu",

    // Footer
    product: "Samfuri",
    company: "Kamfani",
    support: "Tallafi",
    legal: "Doka",
    about: "Game da Mu",
    careers: "Ayyuka",
    blog: "Blog",
    helpCenter: "Cibiyar Taimako",
    contact: "Tuntuɓi",
    privacy: "Manufofin Sirri",
    terms: "Sharuɗɗan Sabis",
    copyright: "© 2025 StockSight. Duk haƙƙoƙi an tanada su.",

    // Auth common
    email: "Imel",
    password: "Kalmar sirri",
    confirmPassword: "Tabbatar da Kalmar sirri",
    fullName: "Cikakken Suna",
    businessName: "Sunan Kasuwanci",
    phoneNumber: "Lambar Waya",

    // Login
    login: "Shiga",
    welcomeBack: "Barka da Dawowa",
    loginSubtitle: "Shiga don samun damar dashboard ɗinku",
    rememberMe: "Tuna ni",
    forgotPassword: "Manta kalmar sirri?",
    noAccount: "Ba ku da asusu ba?",
    signUp: "Yi rajista",
    signingIn: "Ana shiga...",

    // Register
    register: "Yi Rajista",
    createAccount: "Ƙirƙiri Asusu",
    registerSubtitle: "Fara sarrafa kayayyakin ku yau",
    agreeTerms: "Na yarda da Sharuɗɗan Sabis da Manufofin Sirri",
    hasAccount: "Kuna da asusu?",
    signIn: "Shiga",
    creating: "Ana ƙirƙira asusu...",

    // Password Reset
    resetPassword: "Sake Saita Kalmar Sirri",
    resetSubtitle: "Shigar da imel ɗinku don karɓar hanyar haɗi",
    sendResetLink: "Aika Hanyar Haɗi",
    sending: "Ana aikawa...",
    backToLogin: "Koma shiga",
    resetSent: "An aika hanyar haɗi!",
    checkEmail: "Duba imel ɗinku don hanyar sake saita kalmar sirri.",

    // Validation
    required: "Ana buƙatar wannan filin",
    invalidEmail: "Da fatan za a shigar da ingantaccen imel",
    passwordMin: "Kalmar sirri dole ta kasance aƙalla haruffa 8",
    passwordMatch: "Kalmomin sirri ba su dace ba",

    // Dashboard
    dashboard: "Dashboard",
    inventory: "Kayayyaki",
    sales: "Tallace-tallace",
    reports: "Rahotanni",
    settings: "Saituna",
    users: "Masu Amfani",
    logout: "Fita",
    totalProducts: "Jimlar Kayayyaki",
    lowStock: "Ƙarancin Kayayyaki",
    todaySales: "Tallace-tallacen Yau",
    totalRevenue: "Jimlar Kuɗin Shiga",
    recentSales: "Tallace-tallace na Kwanan nan",
    topProducts: "Manyan Kayayyaki",
    quickActions: "Ayyuka Masu Sauri",
    addProduct: "Ƙara Kayayyaki",
    recordSale: "Yi Rikodin Tallace-tallace",
    viewReports: "Duba Rahotanni",
    manageUsers: "Sarrafa Masu Amfani",
  },
  yo: {
    // Common
    appName: "StockSight",
    tagline: "Ìṣàkóso Ohun-ìní ní Àkókò Gidi",
    subtitle: "Tẹ̀lé àwọn ohun-ìní àti títà ní àkókò gidi. Má padánù ìwòran iṣẹ́ rẹ mọ́.",
    getStarted: "Bẹ̀rẹ̀",
    learnMore: "Kọ́ Síi",

    // Language names
    english: "Gẹ̀ẹ́sì",
    hausa: "Hausa",
    yoruba: "Yorùbá",
    igbo: "Igbo",
    selectLanguage: "Yan Èdè",

    // Welcome page
    heroTitle: "Mọ Ohun-ìní Rẹ. Ṣàkóso Iṣẹ́ Rẹ.",
    heroSubtitle:
      "Ọ̀nà tó yára jùlọ fún àwọn oníṣòwò láti tẹ̀lé ohun-ìní àti títà—láìsí ìwàhàlà tàbí àìgbẹ́kẹ̀lé. Ìwòran àkókò gidi, ìṣàkóso pípé.",
    trustedBy: "Àwọn oníṣòwò 500+ ní gbogbo Nàìjíríà gbẹ́kẹ̀lé rẹ̀",
    startFreeTrial: "Bẹ̀rẹ̀ Ìdánwò Ọ̀fẹ́",
    watchDemo: "Wo Àpèjuwe",

    // Problem section
    problemTitle: "Ṣíṣe iṣẹ́ ṣọ́ọ̀pù kò gbọ́dọ̀ nira báyìí",
    problemSubtitle: "Àwọn oníṣòwò ń kojú ìṣòro lójoojúmọ́ tó ń ba àkókò, owó, àti àlàáfíà jẹ́",
    problems: {
      inventory: {
        title: "Rúdurùdu Ohun-ìní",
        description: "Àìmọ̀ iye ohun-ìní gangan. Kíkà pẹ̀lú ọwọ́ tó nira. Ohun-ìní púpọ̀ tàbí àìtó ń ba owó jẹ́.",
      },
      money: {
        title: "Àṣírí Owó",
        description: "Owó pẹ̀lú títà kò bá ara mu. Ìròyìn títà kéré ju. Kò sí ọ̀nà láti ṣàyẹ̀wò owó ojoojúmọ́.",
      },
      trust: {
        title: "Ìṣòro Ìgbẹ́kẹ̀lé",
        description: "Kò sí ọ̀nà láti ṣàyẹ̀wò iṣẹ́ àwọn aṣòwò. A lè yí àwọn àkọsílẹ̀ padà. Kò lè ṣàyẹ̀wò nígbà tí o kò sí.",
      },
    },

    // Solution section
    solutionTitle: "Nígbẹ̀yìn, ìwòran pípé",
    solutionSubtitle: "StockSight fún ọ ní ìṣàkóso àkókò gidi lórí ohun-ìní àti títà rẹ—bí o tilẹ̀ kò sí ní ṣọ́ọ̀pù",

    // Features section
    featuresTitle: "Gbogbo ohun tí o nílò láti ṣe iṣẹ́ ṣọ́ọ̀pù rẹ pẹ̀lú ìgbẹ́kẹ̀lé",
    features: {
      realTime: "Ìtẹ̀lé ní Àkókò Gidi",
      realTimeDesc: "Wo àwọn ìmúdójúìwọ̀n ohun-ìní lẹ́sẹ̀kẹsẹ̀ bí wọ́n ṣe ń ṣe títà",
      secure: "Ààbò & Aláìyípadà",
      secureDesc: "Àǹfààní tó dá lórí ipò pẹ̀lú àwọn àkọsílẹ̀ àyẹ̀wò aláìyípadà",
      insights: "Ìmọ̀ Ọlọ́gbọ́n",
      insightsDesc: "Àwọn ìròyìn ojoojúmọ́ àti ìkìlọ̀ ohun-ìní kékeré láìfọwọ́yí",
      inventory: "Ìṣàkóso Ohun-ìní",
      inventoryDesc: "Ṣàfikún ohun-ìní, tẹ̀lé iye, owó rírà, àti owó títà",
      sales: "Ṣíṣe Àkọsílẹ̀ Títà",
      salesDesc: "Ṣíṣe àkọsílẹ̀ títà ojoojúmọ́ rọrùn pẹ̀lú ìṣirò àìfọwọ́yí",
      reconciliation: "Ìṣọ̀kan Ojoojúmọ́",
      reconciliationDesc: "Ṣe àfiwé owó tí a retí pẹ̀lú èyí tí a gbà. Fọwọ́sí tàbí tako àwọn àkọsílẹ̀",
      multiDevice: "Àǹfààní Ẹ̀rọ Púpọ̀",
      multiDeviceDesc: "Wọlé sí dashboard rẹ lórí fóònù tàbí kọ̀ǹpútà, níbikíbi",
      alerts: "Ìkìlọ̀ Ọlọ́gbọ́n",
      alertsDesc: "Ìfitónilétí ohun-ìní kékeré kí o má ba parí",
    },

    // How it works
    howItWorksTitle: "Bí StockSight Ṣe Ń Ṣiṣẹ́",
    howItWorksSubtitle: "Bẹ̀rẹ̀ ní ìṣẹ́jú díẹ̀, rí àbájáde lẹ́sẹ̀kẹsẹ̀",
    steps: {
      step1: {
        title: "Ṣẹ̀dá Àkáǹtì Rẹ",
        description: "Forúkọsílẹ̀ gẹ́gẹ́ bí oníṣòwò kí o sì ṣètò ohun-ìní rẹ",
      },
      step2: {
        title: "Ṣàfikún Àwọn Ọjà Rẹ",
        description: "Tẹ àwọn ọjà pẹ̀lú iye àti owó",
      },
      step3: {
        title: "Pe Àwọn Aṣòwò",
        description: "Ṣẹ̀dá àkáǹtì fún ẹgbẹ́ títà rẹ",
      },
      step4: {
        title: "Tẹ̀lé Gbogbo Nnkan",
        description: "Ṣàyẹ̀wò ohun-ìní, títà, àti owó ní àkókò gidi",
      },
    },

    // Pricing
    pricingTitle: "Owó Tó Rọrùn, Tó Ṣe Kedere",
    pricingSubtitle: "Bẹ̀rẹ̀ lọ́fẹ̀ẹ́, gbéga bí o ṣe ń dàgbà",
    perMonth: "/oṣù",
    mostPopular: "Olókìkí Jùlọ",
    getStartedWith: "Bẹ̀rẹ̀",
    tiers: {
      starter: {
        name: "Àkọ́kọ́",
        price: "₦3,000",
        description: "Dára fún àwọn oníṣòwò kan ṣoṣo",
        features: ["Ṣọ́ọ̀pù 1", "Ọjà 500", "Àkáǹtì aṣòwò 2", "Ìròyìn ojoojúmọ́", "Ìrànlọ́wọ́ ímeèlì"],
      },
      business: {
        name: "Iṣẹ́",
        price: "₦8,000",
        description: "Fún àwọn iṣẹ́ tó ń dàgbà",
        features: ["Ẹ̀ka 3", "Ọjà àìlópin", "Àkáǹtì aṣòwò 10", "Ìtúpalẹ̀ gíga", "Ìròyìn WhatsApp", "Ìrànlọ́wọ́ àkọ́kọ́"],
      },
      enterprise: {
        name: "Ilé-iṣẹ́",
        price: "Àkànṣe",
        description: "Fún àwọn iṣẹ́ńlá",
        features: [
          "Ẹ̀ka àìlópin",
          "Gbogbo nnkan àìlópin",
          "Ìsopọ̀ àkànṣe",
          "Ìrànlọ́wọ́ tótó",
          "Ìkẹ́kọ̀ọ́ lórí ibi",
          "Ìdánilójú SLA",
        ],
      },
    },

    // CTA
    ctaTitle: "Ṣé o ti ṣe tán láti ṣàkóso ohun-ìní rẹ?",
    ctaSubtitle: "Darapọ̀ mọ́ àwọn oníṣòwò 500+ tí wọ́n gbẹ́kẹ̀lé StockSight láti ṣe iṣẹ́ wọn",

    // Footer
    product: "Ọjà",
    company: "Ilé-iṣẹ́",
    support: "Ìrànlọ́wọ́",
    legal: "Òfin",
    about: "Nípa Wa",
    careers: "Iṣẹ́",
    blog: "Blog",
    helpCenter: "Ibùdó Ìrànlọ́wọ́",
    contact: "Kàn sí Wa",
    privacy: "Ìlànà Ìkọ̀kọ̀",
    terms: "Àwọn Ìpinnu Iṣẹ́",
    copyright: "© 2025 StockSight. Gbogbo ẹ̀tọ́ ti wà ní ìpàmọ́.",

    // Auth common
    email: "Ímeèlì",
    password: "Ọ̀rọ̀ aṣínà",
    confirmPassword: "Jẹ́rìísí Ọ̀rọ̀ aṣínà",
    fullName: "Orúkọ Kíkún",
    businessName: "Orúkọ Iṣẹ́",
    phoneNumber: "Nọ́mbà Fóònù",

    // Login
    login: "Wọlé",
    welcomeBack: "Káàbọ̀ Padà",
    loginSubtitle: "Wọlé láti ní àǹfààní sí dashboard rẹ",
    rememberMe: "Rántí mi",
    forgotPassword: "Gbàgbé ọ̀rọ̀ aṣínà?",
    noAccount: "Ò ní àkáǹtì?",
    signUp: "Forúkọ sílẹ̀",
    signingIn: "Ń wọlé...",

    // Register
    register: "Forúkọ sílẹ̀",
    createAccount: "Ṣẹ̀dá Àkáǹtì",
    registerSubtitle: "Bẹ̀rẹ̀ ṣíṣàkóso ohun-ìní rẹ lónìí",
    agreeTerms: "Mo gbà pẹ̀lú Àwọn Ìpinnu Iṣẹ́ àti Ìlànà Ìkọ̀kọ̀",
    hasAccount: "Ò ti ní àkáǹtì?",
    signIn: "Wọlé",
    creating: "Ń ṣẹ̀dá àkáǹtì...",

    // Password Reset
    resetPassword: "Tún Ọ̀rọ̀ Aṣínà Ṣe",
    resetSubtitle: "Tẹ ímeèlì rẹ láti gba ìjápọ̀ àtúnṣe",
    sendResetLink: "Fi Ìjápọ̀ Àtúnṣe Ránṣẹ́",
    sending: "Ń fi ránṣẹ́...",
    backToLogin: "Padà sí wíwọlé",
    resetSent: "Ìjápọ̀ àtúnṣe ti ránṣẹ́!",
    checkEmail: "Ṣàyẹ̀wò ímeèlì rẹ fún ìjápọ̀ àtúnṣe ọ̀rọ̀ aṣínà.",

    // Validation
    required: "A nílò àaye yìí",
    invalidEmail: "Jọ̀wọ́ tẹ ímeèlì tó tọ́",
    passwordMin: "Ọ̀rọ̀ aṣínà gbọ́dọ̀ jẹ́ ó kéré tán àwọn lẹ́tà 8",
    passwordMatch: "Àwọn ọ̀rọ̀ aṣínà kò báramu",

    // Dashboard
    dashboard: "Dasíbọ́ọ̀dù",
    inventory: "Ohun-ìní",
    sales: "Títà",
    reports: "Ìròyìn",
    settings: "Ètò",
    users: "Àwọn Olùmúlò",
    logout: "Jáde",
    totalProducts: "Àpapọ̀ Ọjà",
    lowStock: "Ohun-ìní Kékeré",
    todaySales: "Títà Lónìí",
    totalRevenue: "Àpapọ̀ Owó Tí A Ń Gbà",
    recentSales: "Títà Láìpẹ́",
    topProducts: "Àwọn Ọjà Tó Ga Jùlọ",
    quickActions: "Àwọn Iṣẹ́ Kíákíá",
    addProduct: "Ṣàfikún Ọjà",
    recordSale: "Ṣe Àkọsílẹ̀ Títà",
    viewReports: "Wo Ìròyìn",
    manageUsers: "Ṣàkóso Àwọn Olùmúlò",
  },
  ig: {
    // Common
    appName: "StockSight",
    tagline: "Njikwa Ngwaahịa n'Oge Eziokwu",
    subtitle: "Soro ngwaahịa na ịre ahịa n'oge eziokwu. Echefukwala ịhụ azụmahịa gị ọzọ.",
    getStarted: "Malite",
    learnMore: "Mụta Karịa",

    // Language names
    english: "Bekee",
    hausa: "Hausa",
    yoruba: "Yoruba",
    igbo: "Igbo",
    selectLanguage: "Họrọ Asụsụ",

    // Welcome page
    heroTitle: "Mara Ngwaahịa Gị. Jikwaa Azụmahịa Gị.",
    heroSubtitle:
      "Ụzọ kachasị ọsọ maka ndị nwe ụlọ ahịa isoro ngwaahịa na ịre ahịa—na-enweghị nsogbu ma ọ bụ enweghị ntụkwasị obi. Ịhụ n'oge eziokwu, njikwa zuru oke.",
    trustedBy: "Ndị nwe ụlọ ahịa 500+ n'ofe Naịjirịa tụkwasịrị ya obi",
    startFreeTrial: "Malite Nnwale Efu",
    watchDemo: "Lee Ihe Ngosi",

    // Problem section
    problemTitle: "Ịgba ụlọ ahịa ekwesịghị isi ike otu a",
    problemSubtitle: "Ndị nwe ụlọ ahịa na-eche ihe mgbu kwa ụbọchị nke na-efu oge, ego, na udo uche",
    problems: {
      inventory: {
        title: "Ọgba Aghara Ngwaahịa",
        description:
          "Amaghị ọnụ ọgụgụ ngwaahịa kpọmkwem. Ịgụ aka siri ike. Ngwaahịa karịrị akarị ma ọ bụ na-ezu na-emefu ego.",
      },
      money: {
        title: "Ihe Nzuzo Ego",
        description: "Ego na ịre ahịa adabaghị. Akụkọ ịre ahịa pere mpe. Enweghị ụzọ ịchọpụta ego kwa ụbọchị.",
      },
      trust: {
        title: "Nsogbu Ntụkwasị Obi",
        description:
          "Enweghị ụzọ ịchọpụta ihe ndị na-ere ahịa na-eme. A pụrụ ịgbanwe ndekọ. Enweghị ike ịlele mgbe ị nọghị.",
      },
    },

    // Solution section
    solutionTitle: "N'ikpeazụ, ịhụ zuru oke",
    solutionSubtitle:
      "StockSight na-enye gị njikwa n'oge eziokwu n'elu ngwaahịa gị na ịre ahịa—ọ bụladị mgbe ị nọghị n'ụlọ ahịa",

    // Features section
    featuresTitle: "Ihe niile ị chọrọ iji mee azụmahịa ụlọ ahịa gị n'enweghị nsogbu",
    features: {
      realTime: "Nsoro n'Oge Eziokwu",
      realTimeDesc: "Hụ mmelite ngwaahịa ozugbo ka a na-edekọ ịre ahịa",
      secure: "Nchekwa & Enweghị Mgbanwe",
      secureDesc: "Nnweta dabere na ọrụ yana ndekọ nyocha na-adịghị agbanwe agbanwe",
      insights: "Nghọta Amamihe",
      insightsDesc: "Akụkọ kwa ụbọchị na ịdọ aka ná ntị ngwaahịa dị ala na-akpaghị aka",
      inventory: "Njikwa Ngwaahịa",
      inventoryDesc: "Tinye ngwaahịa, soro ọnụ ọgụgụ, ọnụahịa ọzụzụ, na ọnụahịa ịre",
      sales: "Ndekọ Ịre Ahịa",
      salesDesc: "Ntinye ịre ahịa kwa ụbọchị dị mfe yana ngụkọta akpaghị aka",
      reconciliation: "Nhazi Kwa Ụbọchị",
      reconciliationDesc: "Tụnyere ego a tụrụ anya na nke e nwetara. Kwado ma ọ bụ jụ ndekọ",
      multiDevice: "Nnweta Ngwaọrụ Ọtụtụ",
      multiDeviceDesc: "Nweta dashboard gị na ekwentị ma ọ bụ laptọọpụ, ebe ọ bụla",
      alerts: "Ịdọ Aka Ná Ntị Amamihe",
      alertsDesc: "Ọkwa ngwaahịa dị ala ka ị ghara ịgwụ",
    },

    // How it works
    howItWorksTitle: "Otu StockSight Si Arụ Ọrụ",
    howItWorksSubtitle: "Malite n'otu nkeji ole na ole, hụ nsonaazụ ozugbo",
    steps: {
      step1: {
        title: "Mepụta Akaụntụ Gị",
        description: "Debanye aha dị ka onye nwe ụlọ ahịa wee hazie ngwaahịa gị",
      },
      step2: {
        title: "Tinye Ngwaahịa Gị",
        description: "Tinye ngwaahịa yana ọnụ ọgụgụ na ọnụahịa",
      },
      step3: {
        title: "Kpọọ Ndị Na-ere Ahịa",
        description: "Mepụtara akaụntụ maka ndị otu ịre ahịa gị",
      },
      step4: {
        title: "Soro Ihe Niile",
        description: "Lelee ngwaahịa, ịre ahịa, na ego n'oge eziokwu",
      },
    },

    // Pricing
    pricingTitle: "Ọnụahịa Dị Mfe, Doro Anya",
    pricingSubtitle: "Malite n'efu, bulie ka ị na-eto",
    perMonth: "/ọnwa",
    mostPopular: "Kachasị Ewu Ewu",
    getStartedWith: "Malite",
    tiers: {
      starter: {
        name: "Mbido",
        price: "₦3,000",
        description: "Zuru oke maka ndị nwe ụlọ ahịa otu",
        features: ["Ụlọ ahịa 1", "Ngwaahịa ruru 500", "Akaụntụ 2 onye na-ere ahịa", "Akụkọ kwa ụbọchị", "Nkwado email"],
      },
      business: {
        name: "Azụmahịa",
        price: "₦8,000",
        description: "Maka azụmahịa na-eto eto",
        features: [
          "Ngalaba ruru 3",
          "Ngwaahịa enweghị njedebe",
          "Akaụntụ 10 onye na-ere ahịa",
          "Nyocha dị elu",
          "Akụkọ WhatsApp",
          "Nkwado mbụ",
        ],
      },
      enterprise: {
        name: "Ụlọ Ọrụ",
        price: "Akọwapụtara",
        description: "Maka ọrụ buru ibu",
        features: [
          "Ngalaba enweghị njedebe",
          "Ihe niile enweghị njedebe",
          "Njikọ akọwapụtara",
          "Nkwado raara onwe ya nye",
          "Ọzụzụ n'ebe",
          "Nkwa SLA",
        ],
      },
    },

    // CTA
    ctaTitle: "Ị dị njikere ijikwa ngwaahịa gị?",
    ctaSubtitle: "Sonye ndị nwe ụlọ ahịa 500+ ndị tụkwasịrị StockSight obi iji mee azụmahịa ha",

    // Footer
    product: "Ngwaahịa",
    company: "Ụlọ Ọrụ",
    support: "Nkwado",
    legal: "Iwu",
    about: "Banyere Anyị",
    careers: "Ọrụ",
    blog: "Blog",
    helpCenter: "Ebe Enyemaka",
    contact: "Kpọtụrụ Anyị",
    privacy: "Iwu Nzuzo",
    terms: "Usoro Ọrụ",
    copyright: "© 2025 StockSight. Ikike niile echekwara.",

    // Auth common
    email: "Email",
    password: "Okwuntughe",
    confirmPassword: "Kwado Okwuntughe",
    fullName: "Aha Zuru Oke",
    businessName: "Aha Azụmahịa",
    phoneNumber: "Nọmba Ekwentị",

    // Login
    login: "Banye",
    welcomeBack: "Nnọọ Azụ",
    loginSubtitle: "Banye iji nweta dashboard gị",
    rememberMe: "Cheta m",
    forgotPassword: "Chefuru okwuntughe?",
    noAccount: "Ị nweghị akaụntụ?",
    signUp: "Debanye aha",
    signingIn: "Na-abanye...",

    // Register
    register: "Debanye Aha",
    createAccount: "Mepụta Akaụntụ",
    registerSubtitle: "Malite ijikwa ngwaahịa gị taa",
    agreeTerms: "Ekwenyere m na Usoro Ọrụ na Iwu Nzuzo",
    hasAccount: "Ị nwere akaụntụ?",
    signIn: "Banye",
    creating: "Na-emepụta akaụntụ...",

    // Password Reset
    resetPassword: "Tọgharia Okwuntughe",
    resetSubtitle: "Tinye email gị iji nata njikọ ntọgharia",
    sendResetLink: "Ziga Njikọ Ntọgharia",
    sending: "Na-eziga...",
    backToLogin: "Laghachi na ịbanye",
    resetSent: "Ezigara njikọ ntọgharia!",
    checkEmail: "Lelee email gị maka njikọ ntọgharia okwuntughe.",

    // Validation
    required: "A chọrọ ubi a",
    invalidEmail: "Biko tinye email ziri ezi",
    passwordMin: "Okwuntughe ga-enwerịrị mkpụrụedemede 8",
    passwordMatch: "Okwuntughe abụghị otu",

    // Dashboard
    dashboard: "Dashibọọdụ",
    inventory: "Ngwaahịa",
    sales: "Ịre Ahịa",
    reports: "Akụkọ",
    settings: "Ntọala",
    users: "Ndị Ọrụ",
    logout: "Pụọ",
    totalProducts: "Ngwaahịa Niile",
    lowStock: "Ngwaahịa Dị Ala",
    todaySales: "Ịre Ahịa Taa",
    totalRevenue: "Ego Niile E Nwetara",
    recentSales: "Ịre Ahịa Nso Nso A",
    topProducts: "Ngwaahịa Kacha Mma",
    quickActions: "Omume Ọsọ Ọsọ",
    addProduct: "Tinye Ngwaahịa",
    recordSale: "Dekọọ Ịre Ahịa",
    viewReports: "Lee Akụkọ",
    manageUsers: "Jikwaa Ndị Ọrụ",
  },
}

type TranslationType = typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationType
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const saved = localStorage.getItem("stocksight-language") as Language
    if (saved && translations[saved]) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("stocksight-language", lang)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
