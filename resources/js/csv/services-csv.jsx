export const ServicesCSVColumns = [
  { name: 'name', type: 'string', max: 255, min: 5, isUnique: false, defaultValue: null },
  { name: 'user', type: 'users(id)', max: '-', min: '-', isUnique: false, defaultValue: null },
  { name: 'category', type: 'categories(id)', max: '-', min: '-', isUnique: false, defaultValue: null },
  { name: 'sub_category', type: 'sub_categories(id)', max: '-', min: '-', isUnique: false, defaultValue: null },
  { name: 'salary', type: 'sub_categories(id)', max: '2^11', min: '0', isUnique: false, defaultValue: null },
  { name: 'salary_per_hour', type: 'number', max: '2^11', min: '0', isUnique: false, defaultValue: null },
  { name: 'publisher', type: 'number [0, 1]', max: '', min: '-', typeHint: '0 for user, 1 for company', defaultValue: 0 },
]
