export const UsersCSVColumns = [
  { name: 'name', type: 'string', max: 255, min: 5, isUnique: false, defaultValue: null },
  { name: 'username', type: 'string', max: 255, min: 5, isUnique: true, defaultValue: null },
  { name: 'email', type: 'email', max: 255, min: '-', isUnique: true, defaultValue: null },
  { name: 'national_id', type: 'number', max: '14 digits', min: '14 digits', isUnique: true, defaultValue: null },
  { name: 'location', type: 'url', max: 255, min: 5, isUnique: false, defaultValue: null },
  { name: 'city', type: 'country', max: 255, min: 5, isUnique: false, defaultValue: null },
  { name: 'address', type: 'string', max: 255, min: 5, isUnique: false, defaultValue: null },
  { name: 'phone', type: 'Egyptian phone', max: 255, min: 5, isUnique: true, defaultValue: null },
  { name: 'verified', type: '[0, 1]', max: 1, min: 0, typeHint: '1 for verified', defaultValue: 0 },
]
