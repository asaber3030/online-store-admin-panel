import {
  faBuilding, faCheck, faCog, faEdit, faFileImport, faHandsHelping,
  faHelmetSafety,
  faListNumeric, faPlus,
  faShoppingCart,
  faSubscript, faTrash,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export const APP_URL = 'http://127.0.0.1:8000/'
export const APP_NAME = 'INote'

export const DEFAULT_IMAGE_ADMIN = 'defaults/images/user.svg'

export const DEFAULT_VIEW_ITEMS = 'itemsViewType';

export const MONTHS_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MONTHS_NAMES_IN_ARABIC = [
  "يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
  "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
]
export const DAYS_NAMES_IN_ARABIC = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"]

export const COMPANIES_TYPES = {
  0: 'Local Company',
  1: 'Amateur Company',
  2: 'International Company'
}
export const COMPANIES_TYPES_ARRAY = [
  { id: 0, name: 'Local Company' },
  { id: 1, name: 'Intermediate Company' },
  { id: 2, name: 'International Company' },
]

export const IMPORT_LIST_ITEMS = [
  { name: 'Import Products', url: '' }
]

export const VERIFIED_STATUS_ARRAY = [
  { value: 0, text: 'Not Verified' },
  { value: 1, text: 'Verified' },
]

export const CATEGORIES_TYPES_ARRAY = [
  { value: 0, text: 'Products Category' },
  { value: 1, text: 'Jobs Category' },
  { value: 2, text: 'Services Category' },
]

export const CATEGORIES_TYPES_OBJECT = {
  0: 'Products Category',
  1: 'Jobs Category',
  2: 'Services Category'
}

export const CONTRACT_TYPE_ARRAY = [
  { text: 'Full-time', value: 0 },
  { text: 'Part-time', value: 1 }
]

export const CONTRACT_TYPE_OBJECT = {
  0: 'Full-time',
  1: 'Part-time'
}

export const PRODUCT_PAYMENT_STATUS = {
  0: 'Reviewing in progress',
  1: 'Reviewed',
  2: 'Charged',
  3: 'Out For Delivery',
  4: 'Delivered',
}

export const IMPORTING_URLS = [
  {
    name: 'Categories',
    url: route('admin.import.companies.main'),
    icon: faListNumeric
  },
  {
    name: 'Sub Categories',
    url: route('admin.import.companies.main'),
    icon: faSubscript
  },
  {
    name: 'Companies',
    url: route('admin.import.companies.main'),
    icon: faBuilding
  },
  {
    name: 'Users',
    url: route('admin.import.companies.main'),
    icon: faUsers
  },
  {
    name: 'Products',
    url: route('admin.import.companies.main'),
    icon: faShoppingCart
  },
  {
    name: 'Jobs',
    url: route('admin.import.companies.main'),
    icon: faHelmetSafety
  },
  {
    name: 'Services',
    url: route('admin.import.companies.main'),
    icon: faHandsHelping
  }

]

export const ACTIVITY_ICONS = {
  trash: <FontAwesomeIcon icon={faTrash} />,
  plus: <FontAwesomeIcon icon={faPlus} />,
  edit: <FontAwesomeIcon icon={faEdit} />,
  default: <FontAwesomeIcon icon={faCheck} />,
  import: <FontAwesomeIcon icon={faFileImport} />,
  settings: <FontAwesomeIcon icon={faCog} />,
}
