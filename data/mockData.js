export const mockUsers = {
  'MP0345678': {
    password: 'TestPass123',
    name: 'Dr. Michael Thompson',
    regNumber: 'MP0345678',
    profession: 'Medical Practitioner',
    status: 'Active',
    location: 'Cape Town',
    registrationDate: '2018-03-15',
    cpdPoints: 22,
    cpdTotal: 30,
    balance: 3750.00,
    invoices: [
      { 
        id: 'INV-2025-001', 
        title: 'Annual Registration Fee 2025', 
        amount: 1850, 
        status: 'overdue', 
        daysOverdue: 34,
        dueDate: '2025-01-31',
        category: 'Medical Practitioner'
      },
      { 
        id: 'INV-2025-007', 
        title: 'CPD Assessment Fee', 
        amount: 950, 
        status: 'pending', 
        daysDue: 23,
        dueDate: '2025-10-15',
        category: 'CPD Compliance'
      },
      { 
        id: 'INV-2025-003', 
        title: 'Late Payment Penalty', 
        amount: 250, 
        status: 'overdue',
        dueDate: '2025-03-01',
        category: 'Penalty Fee'
      },
      { 
        id: 'INV-2025-009', 
        title: 'Specialist Registration', 
        amount: 700, 
        status: 'pending', 
        daysDue: 69,
        dueDate: '2025-11-30',
        category: 'Cardiology'
      }
    ],
    cpdCategories: [
      { name: 'Ethics & Professional Conduct', earned: 8, required: 5, status: 'complete' },
      { name: 'Clinical Skills & Knowledge', earned: 10, required: 15, status: 'progress' },
      { name: 'Research & Development', earned: 0, required: 3, status: 'not_started' },
      { name: 'General Activities', earned: 4, required: 0, status: 'additional' }
    ]
  },
  'MP0567891': {
    password: 'TestPass456',
    name: 'Dr. James Peterson',
    regNumber: 'MP0567891',
    profession: 'General Practitioner',
    status: 'Active',
    location: 'Johannesburg',
    registrationDate: '2015-08-22',
    cpdPoints: 8,
    cpdTotal: 30,
    balance: 5240.00,
    invoices: [
      { 
        id: 'INV-2025-012', 
        title: 'Annual Registration Fee 2025', 
        amount: 1850, 
        status: 'overdue', 
        daysOverdue: 67,
        category: 'General Practitioner'
      },
      { 
        id: 'INV-2025-008', 
        title: 'CPD Non-compliance Fine', 
        amount: 1500, 
        status: 'overdue', 
        daysOverdue: 45,
        category: 'Penalty'
      }
    ],
    cpdCategories: [
      { name: 'Ethics & Professional Conduct', earned: 3, required: 5, status: 'progress' },
      { name: 'Clinical Skills & Knowledge', earned: 5, required: 15, status: 'progress' },
      { name: 'Research & Development', earned: 0, required: 3, status: 'not_started' },
      { name: 'General Activities', earned: 0, required: 0, status: 'not_started' }
    ]
  },
  'DP0234567': {
    password: 'TestPass789',
    name: 'Dr. Sarah Johnson',
    regNumber: 'DP0234567',
    profession: 'Dental Practitioner',
    status: 'Active',
    location: 'Durban',
    registrationDate: '2019-05-10',
    cpdPoints: 28,
    cpdTotal: 30,
    balance: 0,
    invoices: [
      { 
        id: 'INV-2025-015', 
        title: 'Annual Registration Fee 2025', 
        amount: 1650, 
        status: 'paid', 
        paidDate: '2025-01-15',
        category: 'Dental Practitioner'
      }
    ],
    cpdCategories: [
      { name: 'Ethics & Professional Conduct', earned: 6, required: 5, status: 'complete' },
      { name: 'Clinical Skills & Knowledge', earned: 15, required: 15, status: 'complete' },
      { name: 'Research & Development', earned: 3, required: 3, status: 'complete' },
      { name: 'General Activities', earned: 4, required: 0, status: 'additional' }
    ]
  },
  'PS0345678': {
    password: 'TestPass321',
    name: 'Dr. Michael Brown',
    regNumber: 'PS0345678',
    profession: 'Clinical Psychologist',
    status: 'Pending CPD',
    location: 'Pretoria',
    registrationDate: '2020-02-28',
    cpdPoints: 15,
    cpdTotal: 30,
    balance: 1200.00,
    invoices: [
      { 
        id: 'INV-2025-018', 
        title: 'CPD Extension Fee', 
        amount: 750, 
        status: 'pending', 
        daysDue: 15,
        category: 'CPD Compliance'
      },
      { 
        id: 'INV-2025-019', 
        title: 'Registration Renewal', 
        amount: 450, 
        status: 'pending', 
        daysDue: 8,
        category: 'Psychology'
      }
    ],
    cpdCategories: [
      { name: 'Ethics & Professional Conduct', earned: 5, required: 5, status: 'complete' },
      { name: 'Clinical Skills & Knowledge', earned: 8, required: 15, status: 'progress' },
      { name: 'Research & Development', earned: 2, required: 3, status: 'progress' },
      { name: 'General Activities', earned: 0, required: 0, status: 'not_started' }
    ]
  },
  'ADMIN001': {
    password: 'AdminTest123',
    name: 'System Administrator',
    regNumber: 'ADMIN001',
    profession: 'Administrator',
    status: 'Admin',
    isAdmin: true,
    location: 'Pretoria',
    department: 'IT Division'
  }
};

export const mockPractitioners = [
  { name: 'Dr. John Smith', regNumber: 'MP0123456', profession: 'Medical Practitioner', location: 'Cape Town', status: 'Active', registrationDate: '2017-09-12', lastVerified: '2025-09-20' },
  { name: 'Dr. Sarah Johnson', regNumber: 'DP0234567', profession: 'Dental Practitioner', location: 'Johannesburg', status: 'Active', registrationDate: '2019-05-10', lastVerified: '2025-09-21' },
  { name: 'Dr. Michael Brown', regNumber: 'PS0345678', profession: 'Clinical Psychologist', location: 'Durban', status: 'Pending CPD', registrationDate: '2020-02-28', lastVerified: '2025-09-18' },
  { name: 'Dr. Lisa Wilson', regNumber: 'MP0456789', profession: 'Medical Specialist', location: 'Pretoria', status: 'Suspended', registrationDate: '2016-11-03', lastVerified: '2025-09-15' },
  { name: 'Dr. Ahmed Patel', regNumber: 'MP0567890', profession: 'General Practitioner', location: 'Port Elizabeth', status: 'Active', registrationDate: '2018-07-25', lastVerified: '2025-09-22' },
  { name: 'Dr. Nomsa Mbeki', regNumber: 'OT0678901', profession: 'Occupational Therapist', location: 'Bloemfontein', status: 'Active', registrationDate: '2021-01-18', lastVerified: '2025-09-19' },
  { name: 'Dr. Robert Zulu', regNumber: 'DP0789012', profession: 'Oral Hygienist', location: 'Kimberley', status: 'Under Review', registrationDate: '2019-08-30', lastVerified: '2025-09-16' },
  { name: 'Dr. Maria Gonzalez', regNumber: 'PS0890123', profession: 'Educational Psychologist', location: 'East London', status: 'Expired', registrationDate: '2015-04-14', lastVerified: '2025-09-10' },
  { name: 'Dr. David Chen', regNumber: 'MP0901234', profession: 'Cardiologist', location: 'Cape Town', status: 'Active', registrationDate: '2014-12-08', lastVerified: '2025-09-21' },
  { name: 'Dr. Jennifer Adams', regNumber: 'DP1012345', profession: 'Orthodontist', location: 'Johannesburg', status: 'Active', registrationDate: '2017-03-22', lastVerified: '2025-09-20' },
  { name: 'Dr. Thabo Mokwena', regNumber: 'PS1123456', profession: 'Clinical Psychologist', location: 'Polokwane', status: 'Active', registrationDate: '2018-10-15', lastVerified: '2025-09-19' },
  { name: 'Dr. Emma Thompson', regNumber: 'MP1234567', profession: 'Neurologist', location: 'Durban', status: 'Active', registrationDate: '2016-06-09', lastVerified: '2025-09-22' }
];

export const complaintTypes = [
  'Professional Misconduct',
  'Unprofessional Conduct',
  'Improper Treatment',
  'Billing Issues',
  'Communication Problems',
  'Breach of Confidentiality',
  'Other'
];

export const professionFilters = [
  'All',
  'Medical',
  'Dental', 
  'Psychology',
  'Occupational Therapy',
  'Other'
];
