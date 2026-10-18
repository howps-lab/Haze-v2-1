import {
  AirQualityCategoryInfo,
  PM25Category,
  ActivityGuidance,
  VulnerableGroup,
  SingaporeRegion,
  RegionalReadings
} from '../types/haze';

export const PM25_CATEGORIES: Record<PM25Category, AirQualityCategoryInfo> = {
  NORMAL: {
    category: 'NORMAL',
    label: 'Normal',
    range: '0 – 55 µg/m³',
    min: 0,
    max: 55,
    colorName: 'Green',
    bgLight: 'bg-emerald-50',
    bgCard: 'bg-[#EBF7EE]',
    badgeBg: 'bg-[#22C55E]',
    borderColor: 'border-[#22C55E]',
    textColor: 'text-[#15803D]',
    headlineAdvice: 'Normal outdoor activities are generally suitable.',
    detailedAdvice: 'Air quality is clean and healthy. You can carry on with outdoor sports, jogging, cycling, and park visits as usual.',
    healthyAdultGuidance: 'Normal activities suitable. Enjoy outdoor workouts.',
    vulnerableGuidance: 'Normal activities suitable for children, seniors, and pregnant women.',
    iconType: 'smile',
  },
  ELEVATED: {
    category: 'ELEVATED',
    label: 'Elevated',
    range: '56 – 150 µg/m³',
    min: 56,
    max: 150,
    colorName: 'Amber',
    bgLight: 'bg-amber-50',
    bgCard: 'bg-[#FEF9E7]',
    badgeBg: 'bg-[#F59E0B]',
    borderColor: 'border-[#F59E0B]',
    textColor: 'text-[#B45309]',
    headlineAdvice: 'Reduce strenuous outdoor activity.',
    detailedAdvice: 'Air pollution is rising. Healthy adults should consider pacing down heavy workouts. Vulnerable individuals should avoid strenuous outdoor exertion.',
    healthyAdultGuidance: 'Reduce strenuous outdoor activity (e.g. intense marathons or heavy cycling).',
    vulnerableGuidance: 'Avoid strenuous outdoor activity. Keep inhalers and medication close.',
    iconType: 'neutral',
  },
  HIGH: {
    category: 'HIGH',
    label: 'High',
    range: '151 – 250 µg/m³',
    min: 151,
    max: 250,
    colorName: 'Orange',
    bgLight: 'bg-orange-50',
    bgCard: 'bg-[#FFF3E8]',
    badgeBg: 'bg-[#EA580C]',
    borderColor: 'border-[#EA580C]',
    textColor: 'text-[#C2410C]',
    headlineAdvice: 'Avoid strenuous outdoor activity.',
    detailedAdvice: 'Unhealthy haze levels. Switch outdoor workouts to indoor fitness. Children, elderly, and those with heart or lung conditions should avoid outdoor activity.',
    healthyAdultGuidance: 'Avoid strenuous outdoor activity. Move workouts indoors.',
    vulnerableGuidance: 'Avoid outdoor activity. Close windows and turn on air purifier.',
    iconType: 'concerned',
  },
  VERY_HIGH: {
    category: 'VERY_HIGH',
    label: 'Very High',
    range: '251 µg/m³ & above',
    min: 251,
    max: 999,
    colorName: 'Red',
    bgLight: 'bg-red-50',
    bgCard: 'bg-[#FEE2E2]',
    badgeBg: 'bg-[#DC2626]',
    borderColor: 'border-[#DC2626]',
    textColor: 'text-[#991B1B]',
    headlineAdvice: 'Minimise outdoor activity.',
    detailedAdvice: 'Hazardous air quality. Stay indoors with doors and windows closed. Wear an N95 respirator if prolonged outdoor exposure is unavoidable.',
    healthyAdultGuidance: 'Minimise outdoor activity. Stay indoors where possible.',
    vulnerableGuidance: 'Stay indoors. Seek immediate medical attention if experiencing breathing discomfort.',
    iconType: 'warning',
  },
};

export const getCategoryForPM25 = (value: number): AirQualityCategoryInfo => {
  if (value <= 55) return PM25_CATEGORIES.NORMAL;
  if (value <= 150) return PM25_CATEGORIES.ELEVATED;
  if (value <= 250) return PM25_CATEGORIES.HIGH;
  return PM25_CATEGORIES.VERY_HIGH;
};

export const REGION_NAMES: Record<SingaporeRegion, string> = {
  central: 'Central (Bishan, Toa Payoh, Orchard)',
  north: 'North (Woodlands, Yishun, Sembawang)',
  south: 'South (Marina, Bukit Merah, Sentosa)',
  east: 'East (Bedok, Tampines, Changi)',
  west: 'West (Jurong, Clementi, Bukit Batok)',
};

export const REGION_SHORT_NAMES: Record<SingaporeRegion, string> = {
  central: 'Central',
  north: 'North',
  south: 'South',
  east: 'East',
  west: 'West',
};

export const ACTIVITIES_GUIDANCE: ActivityGuidance[] = [
  {
    id: 'walking',
    title: 'Walking',
    badgeColor: 'bg-[#15803D]',
    normalAdvice: 'Normal commute and walks are fine. Enjoy the park connector!',
    elevatedAdvice: 'Short walks and commutes are fine. Take sheltered walkways.',
    highAdvice: 'Keep outdoor walks brief. Avoid brisk uphill walking.',
    veryHighAdvice: 'Minimise outdoor walking. Use underground MRT links.',
  },
  {
    id: 'jogging',
    title: 'Jogging',
    badgeColor: 'bg-[#EA580C]',
    normalAdvice: 'Great time for your run or marathon training outdoors.',
    elevatedAdvice: 'Reduce distance or switch to a brisk walk or indoor treadmill.',
    highAdvice: 'Avoid outdoor jogging. Move to an indoor gym or home workout.',
    veryHighAdvice: 'Do not jog outdoors. Rest or perform gentle indoor yoga.',
  },
  {
    id: 'cycling',
    title: 'Cycling',
    badgeColor: 'bg-[#0284C7]',
    normalAdvice: 'Cycle freely along park connectors and bike lanes.',
    elevatedAdvice: 'Moderate your pace. Avoid high-exertion sprint rides.',
    highAdvice: 'Avoid outdoor cycling. Use an indoor stationary bicycle.',
    veryHighAdvice: 'Avoid outdoor cycling completely.',
  },
  {
    id: 'playground',
    title: 'Playground',
    badgeColor: 'bg-[#7C3AED]',
    normalAdvice: 'Safe for children to play, slide, and climb.',
    elevatedAdvice: 'Limit vigorous running games; choose shaded play.',
    highAdvice: 'Bring children to indoor play areas or library.',
    veryHighAdvice: 'Keep children indoors with windows closed.',
  },
];

export const VULNERABLE_GROUPS: VulnerableGroup[] = [
  {
    id: 'children',
    title: 'Children',
    summary: 'Young lungs and airways are still developing.',
    details: 'Children breathe more air per kilogram of body weight than adults, making them more sensitive to airborne haze particles.',
    actionRequired: 'Move recess and physical education indoors when PM2.5 rises into Elevated or High.',
    iconName: 'Baby',
  },
  {
    id: 'elderly',
    title: 'Elderly',
    summary: 'Older adults need to take extra precautions.',
    details: 'Seniors may have diminished cardiovascular reserve or unrecognised respiratory sensitivities.',
    actionRequired: 'Take sheltered routes, avoid midday exertion, and keep rooms well-ventilated or air-conditioned.',
    iconName: 'UserCheck',
  },
  {
    id: 'pregnant',
    title: 'Pregnant Women',
    summary: 'Protect both mother and baby from particulate exposure.',
    details: 'High particulate concentrations can place additional oxidative stress on maternal circulation.',
    actionRequired: 'Minimise outdoor exposure when haze rises. Avoid strenuous chores outdoors.',
    iconName: 'HeartHandshake',
  },
  {
    id: 'heart_lung',
    title: 'Heart or Lung Conditions',
    summary: 'Asthma, COPD, bronchitis, or cardiovascular history.',
    details: 'Fine PM2.5 particles can penetrate deep into the bronchioles and trigger bronchospasms or angina.',
    actionRequired: 'Keep prescribed reliever inhalers and oral medicines readily accessible at all times.',
    iconName: 'Activity',
  },
];

export const MASK_GUIDANCE = {
  shortTrips: {
    title: 'Short Trips Outdoors',
    examples: ['Walking to the MRT', 'Going to school or office', 'Quick neighbourhood grocery run'],
    verdict: 'N95 generally not needed',
    explanation: 'For short transit periods (under 30 minutes) at moderate haze levels, healthy individuals do not require an N95 respirator. Normal breathing through the nose helps filter larger particles.',
  },
  prolongedExposure: {
    title: 'Longer Outdoor Exposure',
    examples: ['Outdoor construction or delivery work', 'Extended outdoor security shifts', 'Several consecutive hours outside'],
    verdict: 'Check haze guidance & consider N95',
    explanation: 'If working outdoors for prolonged periods when 24-hr PSI exceeds 100 or 1-hr PM2.5 is elevated/high, a fitted N95 respirator significantly reduces particle inhalation.',
  },
  childrenWarning: {
    title: 'What About Children?',
    verdict: 'Adult N95 masks do not fit children',
    explanation: 'Adult N95 masks do not seal properly against small faces. Leaks around the edges render the filtration ineffective. For children, the primary defense is keeping them indoors.',
  },
  generalReminder: 'Masks are only one part of protection. The most effective safeguard during severe haze is reducing exposure and staying in clean indoor environments.',
};

export const PRACTICAL_TIPS = [
  {
    number: '1',
    title: 'Cut Down Outdoor Time',
    tag: 'Safer indoors',
    description: 'Reduce unnecessary time outdoors when air pollution rises. Reschedule non-urgent outdoor errands for clearer days.',
    action: 'Choose indoor paths or MRT over prolonged street walks.',
    color: '#E02424',
  },
  {
    number: '2',
    title: 'Move Activities Indoors',
    tag: 'Indoor workout',
    description: 'Swap outdoor jogging and sports for indoor equivalents such as yoga, indoor gym workouts, or home exercises.',
    action: 'Keep fitness routines going without inhaling airborne particulates.',
    color: '#0284C7',
  },
  {
    number: '3',
    title: 'Keep Indoor Air Clean',
    tag: 'Close doors & windows',
    description: 'When outdoor air quality drops, close windows and external doors. Use an air purifier equipped with a certified HEPA filter.',
    action: 'Turn on recirculate mode if using home or car air-conditioning.',
    color: '#059669',
  },
  {
    number: '4',
    title: 'Pay Attention to Your Body',
    tag: 'Seek medical care',
    description: 'Watch for symptoms such as persistent coughing, eye irritation, throat soreness, or breathing difficulty.',
    action: 'Reduce exposure and consult a GP or Polyclinic doctor if feeling unwell.',
    color: '#7C3AED',
  },
];

export const FALLBACK_READINGS: RegionalReadings = {
  north: 54,
  south: 49,
  west: 142,
  east: 52,
  central: 88,
};
