import { useState } from 'react';
import Head from 'next/head';
import { mockUsers, mockPractitioners, complaintTypes, professionFilters } from '../data/mockData';
import StatusBar from '../components/StatusBar';
import AppBar from '../components/AppBar';
import BottomNav from '../components/BottomNav';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HPCSAMobileApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [complaintForm, setComplaintForm] = useState({
    type: 'Professional Misconduct',
    regNumber: '',
    description: '',
    email: '',
    phone: '',
    documents: []
  });

  const handleLogin = async (regNumber, password) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user = mockUsers[regNumber];
    if (user && user.password === password) {
      setCurrentUser(user);
      setCurrentScreen('dashboard');
    } else {
      alert('Invalid credentials. Please use the test credentials provided.');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
    setSearchQuery('');
    setSelectedFilter('All');
    setComplaintForm({
      type: 'Professional Misconduct',
      regNumber: '',
      description: '',
      email: '',
      phone: '',
      documents: []
    });
  };

  const filteredPractitioners = mockPractitioners.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.regNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || 
                         p.profession.toLowerCase().includes(selectedFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Suspended': return 'bg-red-100 text-red-800';
      case 'Pending CPD': return 'bg-orange-100 text-orange-800';
      case 'Under Review': return 'bg-purple-100 text-purple-800';
      case 'Expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const LoginScreen = () => {
    const [regNumber, setRegNumber] = useState('MP0345678');
    const [password, setPassword] = useState('TestPass123');

    return (
      <div className="flex flex-col h-full bg-white">
        <StatusBar />
        <div className="flex-1 flex flex-col justify-center items-center px-8">
          <div className="w-[7.5rem] h-[7.5rem] bg-blue-600 rounded-lg flex items-center justify-center text-white text-5xl font-light mb-8 shadow-lg">
            H
          </div>
          <h1 className="text-3xl font-normal text-gray-900 mb-2">HPCSA Mobile</h1>
          <p className="text-gray-600 text-center mb-12 max-w-sm">
            Protecting the Public and Guiding the Professions
          </p>
          
          <div className="w-full max-w-sm space-y-4">
            <input
              type="text"
              placeholder="Registration Number"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              className="w-full h-14 border border-gray-300 rounded px-4 text-base focus:border-blue-600 focus:border-2 outline-none transition-colors"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 border border-gray-300 rounded px-4 text-base focus:border-blue-600 focus:border-2 outline-none transition-colors"
            />
            
            <button
              onClick={() => handleLogin(regNumber, password)}
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-white rounded font-medium text-sm uppercase tracking-wide shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6 transition-colors"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="small" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
            
            <button 
              className="w-full h-12 bg-transparent text-blue-600 border border-blue-600 rounded font-medium text-sm uppercase tracking-wide hover:bg-blue-50 transition-colors"
              disabled={loading}
            >
              Register as Practitioner
            </button>
          </div>
          
          <div className="mt-8 text-center">
            <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded-full flex items-center justify-center text-2xl text-blue-600 mb-2 mx-auto cursor-pointer hover:bg-gray-200 transition-colors">
              👆
            </div>
            <div className="text-xs text-gray-600">Use Fingerprint</div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200 w-full max-w-sm">
            <div className="text-sm font-medium text-blue-600 mb-3">📋 Test Login Details</div>
            <div className="text-xs text-gray-600 space-y-2">
              <div><strong>Active Practitioner:</strong><br />MP0345678 / TestPass123</div>
              <div><strong>Overdue Account:</strong><br />MP0567891 / TestPass456</div>
              <div><strong>Dental Practitioner:</strong><br />DP0234567 / TestPass789</div>
              <div><strong>Psychologist:</strong><br />PS0345678 / TestPass321</div>
              <div><strong>Admin User:</strong><br />ADMIN001 / AdminTest123</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DashboardScreen = () => {
    const cpdPercentage = currentUser ? Math.round((currentUser.cpdPoints / currentUser.cpdTotal) * 100) : 0;

    return (
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppBar 
          title="HPCSA Mobile" 
          rightAction={
            <button 
              onClick={handleLogout}
              className="text-sm hover:bg-blue-700 px-2 py-1 rounded"
            >
              Sign Out
            </button>
          }
        />
        
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="text-center text-gray-700 font-medium py-4 bg-white border-b border-gray-200">
            Welcome, {currentUser?.name}
            <div className="text-xs text-gray-500 mt-1">
              {currentUser?.profession} • {currentUser?.location}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 p-4">
            {[
              { icon: '🔍', title: 'iRegister Search', screen: 'search', desc: 'Find practitioners' },
              { icon: '📚', title: 'CPD Status', screen: 'cpd', desc: 'Track progress' },
              { icon: '💳', title: 'Account & Payments', screen: 'account', desc: 'View invoices' },
              { icon: '⚠️', title: 'Log Complaint', screen: 'complaint', desc: 'Report issues' }
            ].map(item => (
              <button
                key={item.screen}
                onClick={() => setCurrentScreen(item.screen)}
                className="bg-white p-5 rounded-lg shadow-sm text-center hover:shadow-md transition-all transform hover:scale-105"
              >
                <div className="text-3xl text-blue-600 mb-2">{item.icon}</div>
                <div className="text-sm font-medium text-gray-900 mb-1">{item.title}</div>
                <div className="text-xs text-gray-500">{item.desc}</div>
              </button>
            ))}
          </div>

          {!currentUser?.isAdmin && (
            <>
              <div className="mx-4 mb-4 bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <h3 className="font-medium text-gray-900">CPD Progress</h3>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Current Cycle</span>
                    <span className="font-medium">{currentUser?.cpdPoints}/{currentUser?.cpdTotal} Points</span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
                    <div 
                      className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${cpdPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>{cpdPercentage}% Complete</span>
                    <span>Due: Dec 2025</span>
                  </div>
                  {cpdPercentage < 50 && (
                    <div className="mt-3 p-2 bg-orange-50 rounded text-xs text-orange-700">
                      ⚠️ You need {currentUser?.cpdTotal - currentUser?.cpdPoints} more points
                    </div>
                  )}
                </div>
              </div>

              {currentUser?.balance > 0 && (
                <div className="mx-4 mb-4 bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                    <h3 className="font-medium text-gray-900">Account Summary</h3>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Outstanding Balance</span>
                      <span className="font-medium text-red-600 text-lg">R {currentUser.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-600">Overdue Invoices</span>
                      <span className="font-medium text-red-600">
                        {currentUser.invoices?.filter(inv => inv.status === 'overdue').length || 0}
                      </span>
                    </div>
                    <button 
                      onClick={() => setCurrentScreen('account')}
                      className="w-full h-10 bg-red-600 text-white rounded text-sm font-medium uppercase tracking-wide hover:bg-red-700 transition-colors"
                    >
                      Pay Outstanding Fees
                    </button>
                  </div>
                </div>
              )}

              <div className="mx-4 mb-4 bg-white rounded-lg shadow-sm">
                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                  <h3 className="font-medium text-gray-900">Recent Notifications</h3>
                </div>
                <div className="p-4 space-y-3">
                  {currentUser?.balance > 0 && (
                    <div className="pb-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-red-600 mb-1">Payment Overdue</div>
                      <div className="text-xs text-gray-600">You have outstanding fees requiring attention</div>
                    </div>
                  )}
                  {cpdPercentage < 80 && (
                    <div className="pb-3 border-b border-gray-100">
                      <div className="text-sm font-medium text-orange-600 mb-1">CPD Reminder</div>
                      <div className="text-xs text-gray-600">
                        {currentUser?.cpdTotal - currentUser?.cpdPoints} CPD points needed before Dec 31, 2025
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-blue-600 mb-1">System Update</div>
                    <div className="text-xs text-gray-600">New mobile app features available</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentUser?.isAdmin && (
            <div className="mx-4 mb-4 bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h3 className="font-medium text-gray-900">Admin Dashboard</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Total Practitioners</span>
                  <span className="font-medium">{mockPractitioners.length.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Active Registrations</span>
                  <span className="font-medium text-green-600">
                    {mockPractitioners.filter(p => p.status === 'Active').length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Pending Reviews</span>
                  <span className="font-medium text-orange-600">
                    {mockPractitioners.filter(p => p.status === 'Under Review').length}
                  </span>
                </div>
                <button className="w-full h-10 bg-blue-600 text-white rounded text-sm font-medium uppercase tracking-wide hover:bg-blue-700 transition-colors">
                  Admin Panel
                </button>
              </div>
            </div>
          )}
        </div>
        
        <BottomNav active="dashboard" onNavigate={setCurrentScreen} />
      </div>
    );
  };

  const SearchScreen = () => {
    return (
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppBar 
          title="iRegister Search" 
          showBack={currentUser} 
          onBack={() => setCurrentScreen('dashboard')} 
        />
        
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="relative mb-3">
              <div className="absolute left-3 top-3 text-gray-500 text-xl">🔍</div>
              <input
                type="text"
                placeholder="Search by name or registration number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-gray-100 border border-gray-300 rounded-full pl-12 pr-4 text-base focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {professionFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    selectedFilter === filter
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            {filteredPractitioners.map((practitioner, index) => (
              <div key={index} className="flex items-center p-4 border-b border-gray-200 bg-white hover:bg-gray-50 transition-colors">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white mr-4 text-xl">
                  👨‍⚕️
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{practitioner.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {practitioner.regNumber} • {practitioner.profession}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    📍 {practitioner.location} • Registered: {new Date(practitioner.registrationDate).getFullYear()}
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getStatusColor(practitioner.status)}`}>
                    {practitioner.status}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    Last verified: {new Date(practitioner.lastVerified).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            
            {filteredPractitioners.length === 0 && (
              <div className="p-12 text-center text-gray-500">
                <div className="text-6xl mb-4">🔍</div>
                <div className="font-medium mb-2 text-lg">No practitioners found</div>
                <div className="text-sm">Try adjusting your search terms or filters</div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                  <strong>Search tips:</strong><br/>
                  • Use full or partial names<br/>
                  • Try registration numbers<br/>
                  • Select specific profession filters
                </div>
              </div>
            )}
          </div>
        </div>
        
        {currentUser && <BottomNav active="search" onNavigate={setCurrentScreen} />}
      </div>
    );
  };

  const CPDScreen = () => {
    if (!currentUser || currentUser.isAdmin) {
      return (
        <div className="flex flex-col h-full">
          <StatusBar />
          <AppBar title="CPD Status" showBack onBack={() => setCurrentScreen('dashboard')} />
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">⚠️</div>
              <div>CPD tracking not available for admin accounts</div>
            </div>
          </div>
          <BottomNav active="account" onNavigate={setCurrentScreen} />
        </div>
      );
    }

    const cpdPercentage = Math.round((currentUser.cpdPoints / currentUser.cpdTotal) * 100);
    
    return (
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppBar title="CPD Status" showBack onBack={() => setCurrentScreen('dashboard')} />
        
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="m-4 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <h3 className="font-medium">Current CPD Cycle: 2025</h3>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-medium text-blue-600 mb-2">
                  {currentUser.cpdPoints}/{currentUser.cpdTotal}
                </div>
                <div className="text-gray-600 mb-4">CPD Points Earned</div>
                
                <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
                  <div 
                    className="h-3 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${cpdPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{cpdPercentage}% Complete</span>
                  <span>{currentUser.cpdTotal - currentUser.cpdPoints} points remaining</span>
                </div>
                
                {cpdPercentage >= 80 ? (
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                    <div className="text-sm font-medium text-green-800">
                      ✓ Excellent progress! On track to meet requirements by December 2025
                    </div>
                  </div>
                ) : cpdPercentage >= 50 ? (
                  <div className="p-3 bg-orange-50 rounded border-l-4 border-orange-500">
                    <div className="text-sm font-medium text-orange-800">
                      ⚠️ Good progress, but need to catch up. {currentUser.cpdTotal - currentUser.cpdPoints} points needed by Dec 2025
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                    <div className="text-sm font-medium text-red-800">
                      🚨 Urgent attention required! {currentUser.cpdTotal - currentUser.cpdPoints} points needed by Dec 2025
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="m-4 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h3 className="font-medium text-gray-900">Category Breakdown</h3>
            </div>
            <div className="p-4 space-y-4">
              {currentUser.cpdCategories?.map((category, index) => {
                const isComplete = category.status === 'complete';
                const isProgress = category.status === 'progress';
                const isNotStarted = category.status === 'not_started';
                const isAdditional = category.status === 'additional';
                
                return (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    isComplete ? 'bg-green-50 border-green-500' :
                    isProgress ? 'bg-orange-50 border-orange-500' :
                    isNotStarted ? 'bg-red-50 border-red-500' :
                    'bg-blue-50 border-blue-500'
                  }`}>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-600">
                          {category.required > 0 
                            ? `Required minimum: ${category.required} points` 
                            : 'No minimum requirement'
                          }
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-medium ${
                          isComplete ? 'text-green-700' :
                          isProgress ? 'text-orange-700' :
                          isNotStarted ? 'text-red-700' :
                          'text-blue-700'
                        }`}>
                          {category.earned}{category.required > 0 ? `/${category.required}` : ''} points
                          {isComplete ? ' ✓' : ''}
                        </div>
                        <div className={`text-xs ${
                          isComplete ? 'text-green-700' :
                          isProgress ? 'text-orange-700' :
                          isNotStarted ? 'text-red-700' :
                          'text-blue-700'
                        }`}>
                          {isComplete ? 'Complete' :
                           isProgress ? `${category.required - category.earned} needed` :
                           isNotStarted ? 'Not started' :
                           'Additional'}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <div className="text-sm font-medium text-orange-800 mb-1">
                  ⚠️ Deadline Reminder
                </div>
                <div className="text-xs text-gray-600">
                  CPD cycle ends on 31 December 2025 (127 days remaining)
                </div>
              </div>
            </div>
          </div>

          <div className="m-4 bg-white rounded-lg shadow-sm">
            <div className="p-4 space-y-3">
              <button className="w-full h-12 bg-blue-600 text-white rounded font-medium text-sm uppercase tracking-wide hover:bg-blue-700 transition-colors shadow-sm">
                Download Compliance Letter
              </button>
              <button className="w-full h-12 bg-transparent text-blue-600 border border-blue-600 rounded font-medium text-sm uppercase tracking-wide hover:bg-blue-50 transition-colors">
                View Activity History
              </button>
              <button className="w-full h-12 bg-green-600 text-white rounded font-medium text-sm uppercase tracking-wide hover:bg-green-700 transition-colors">
                Find CPD Activities
              </button>
            </div>
          </div>
        </div>
        
        <BottomNav active="account" onNavigate={setCurrentScreen} />
      </div>
    );
  };

  const AccountScreen = () => {
    if (!currentUser || currentUser.isAdmin) {
      return (
        <div className="flex flex-col h-full">
          <StatusBar />
          <AppBar title="Account & Payments" showBack onBack={() => setCurrentScreen('dashboard')} />
          <div className="flex-1 flex items-center justify-center bg-gray-50">
            <div className="text-center text-gray-500">
              <div className="text-4xl mb-4">⚠️</div>
              <div>Payment tracking not available for admin accounts</div>
            </div>
          </div>
          <BottomNav active="account" onNavigate={setCurrentScreen} />
        </div>
      );
    }

    const handlePayment = (invoice) => {
      alert(`Payment initiated for ${invoice.title}
Amount: R ${invoice.amount}

This would redirect to secure payment gateway.`);
    };

    return (
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppBar title="Account & Payments" showBack onBack={() => setCurrentScreen('dashboard')} />
        
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="m-4 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
              <h3 className="font-medium">Account Balance</h3>
            </div>
            <div className="p-6">
              <div className="text-center">
                <div className={`text-4xl font-medium mb-2 ${currentUser.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  R {currentUser.balance.toFixed(2)}
                </div>
                <div className="text-gray-600 mb-2">
                  {currentUser.balance > 0 ? 'Outstanding Balance' : 'Account Up to Date'}
                </div>
                <div className="text-xs text-gray-500">
                  Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                </div>
              </div>
              {currentUser.balance > 0 && (
                <button 
                  onClick={() => alert('Redirecting to secure payment gateway...')}
                  className="w-full h-12 bg-red-600 text-white rounded font-medium text-sm uppercase tracking-wide shadow-sm mt-6 hover:bg-red-700 transition-colors"
                >
                  Pay All Outstanding Fees
                </button>
              )}
            </div>
          </div>

          <div className="m-4 bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h3 className="font-medium text-gray-900">Invoice History</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {currentUser.invoices?.map((invoice, index) => (
                <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl ${
                      invoice.status === 'overdue' ? 'bg-red-50 text-red-600' :
                      invoice.status === 'pending' ? 'bg-orange-50 text-orange-600' :
                      'bg-green-50 text-green-600'
                    }`}>
                      {invoice.status === 'overdue' ? '🚨' : 
                       invoice.status === 'pending' ? '⏰' : '✅'}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{invoice.title}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {invoice.id} • {invoice.category}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {invoice.status === 'overdue' && `${invoice.daysOverdue} days overdue`}
                        {invoice.status === 'pending' && `Due in ${invoice.daysDue} days`}
                        {invoice.status === 'paid' && `Paid on ${invoice.paidDate}`}
                        {invoice.dueDate && invoice.status !== 'paid' && ` • Due: ${invoice.dueDate}`}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-medium text-lg ${
                        invoice.status === 'overdue' ? 'text-red-600' :
                        invoice.status === 'pending' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        R {invoice.amount.toFixed(2)}
                      </div>
                      <div className={`text-xs font-medium uppercase ${
                        invoice.status === 'overdue' ? 'text-red-600' :
                        invoice.status === 'pending' ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {invoice.status}
                      </div>
                      {(invoice.status === 'overdue' || invoice.status === 'pending') && (
                        <button
                          onClick={() => handlePayment(invoice)}
                          className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )) || (
                <div className="p-12 text-center text-gray-500">
                  <div className="text-4xl mb-4">📋</div>
                  <div className="font-medium mb-2">No invoices available</div>
                  <div className="text-sm">Your invoice history will appear here</div>
                </div>
              )}
            </div>
          </div>

          {currentUser.balance === 0 && (
            <div className="m-4 bg-green-50 rounded-lg p-6 border border-green-200">
              <div className="text-center">
                <div className="text-4xl mb-3">🎉</div>
                <div className="font-medium text-green-800 mb-2">Account in Good Standing</div>
                <div className="text-sm text-green-700">
                  All fees are up to date. Thank you for your prompt payments!
                </div>
              </div>
            </div>
          )}
        </div>
        
        <BottomNav active="account" onNavigate={setCurrentScreen} />
      </div>
    );
  };

  const ComplaintScreen = () => {
    const handleComplaintSubmit = () => {
      if (!complaintForm.regNumber || !complaintForm.description || !complaintForm.email) {
        alert('Please fill in all required fields');
        return;
      }
      
      const refNumber = `COMP-${Date.now()}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
      alert(`Complaint submitted successfully!

Reference Number: ${refNumber}

You will receive an email confirmation shortly at ${complaintForm.email}

HPCSA will contact you within 5-7 business days.`);
      
      // Reset form
      setComplaintForm({
        type: 'Professional Misconduct',
        regNumber: '',
        description: '',
        email: '',
        phone: '',
        documents: []
      });
      
      setCurrentScreen('dashboard');
    };

    const practitionerFound = mockPractitioners.find(p => 
      p.regNumber === complaintForm.regNumber
    );

    return (
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppBar title="Log Complaint" showBack onBack={() => setCurrentScreen('dashboard')} />
        
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="p-4 space-y-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="text-sm font-medium text-blue-800 mb-2">
                📝 Complaint Submission
              </div>
              <div className="text-xs text-blue-700 leading-relaxed">
                Submit complaints about professional conduct, treatment quality, or ethical concerns. 
                All complaints are treated confidentially and investigated thoroughly.
              </div>
            </div>

            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Complaint Type *
              </label>
              <select 
                value={complaintForm.type}
                onChange={(e) => setComplaintForm({...complaintForm, type: e.target.value})}
                className="w-full h-14 border border-gray-300 rounded px-4 text-base bg-white focus:border-blue-600 focus:border-2 outline-none transition-colors"
              >
                {complaintTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Practitioner Registration Number *
              </label>
              <input
                type="text"
                placeholder="e.g., MP0123456"
                value={complaintForm.regNumber}
                onChange={(e) => setComplaintForm({...complaintForm, regNumber: e.target.value.toUpperCase()})}
                className="w-full h-14 border border-gray-300 rounded px-4 text-base focus:border-blue-600 focus:border-2 outline-none transition-colors"
              />
              {practitionerFound && (
                <div className="text-sm text-green-700 mt-2 p-2 bg-green-50 rounded border border-green-200">
                  ✓ Practitioner found: <strong>{practitionerFound.name}</strong> - {practitionerFound.profession} ({practitionerFound.location})
                </div>
              )}
              {complaintForm.regNumber && !practitionerFound && complaintForm.regNumber.length >= 8 && (
                <div className="text-sm text-orange-700 mt-2 p-2 bg-orange-50 rounded border border-orange-200">
                  ⚠️ Practitioner not found. Please verify the registration number or proceed if correct.
                </div>
              )}
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Detailed Description *
              </label>
              <textarea
                placeholder="Please provide a detailed description of your complaint, including dates, locations, and specific concerns..."
                value={complaintForm.description}
                onChange={(e) => setComplaintForm({...complaintForm, description: e.target.value})}
                className="w-full h-32 border border-gray-300 rounded px-4 py-4 text-base resize-none focus:border-blue-600 focus:border-2 outline-none transition-colors"
                rows="5"
              />
              <div className="text-xs text-gray-500 mt-1">
                {complaintForm.description.length}/1000 characters
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Supporting Documents
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="text-3xl text-gray-500 mb-2">📎</div>
                <div className="text-gray-600 mb-2">Click to upload documents</div>
                <div className="text-xs text-gray-500 mb-3">PDF, JPG, PNG (max 10MB per file)</div>
                
                {/* Simulated uploaded files */}
                {complaintForm.regNumber && (
                  <div className="space-y-2 mt-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-600 text-lg">📄</span>
                        <div className="text-left">
                          <div className="text-sm font-medium">medical_report.pdf</div>
                          <div className="text-xs text-gray-500">2.3 MB</div>
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-700 text-lg">×</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-gray-700 text-sm font-medium">
                Your Contact Information *
              </label>
              <input
                type="email"
                placeholder="Email address"
                value={complaintForm.email}
                onChange={(e) => setComplaintForm({...complaintForm, email: e.target.value})}
                className="w-full h-14 border border-gray-300 rounded px-4 text-base mb-3 focus:border-blue-600 focus:border-2 outline-none transition-colors"
              />
              <input
                type="tel"
                placeholder="Phone number (optional)"
                value={complaintForm.phone}
                onChange={(e) => setComplaintForm({...complaintForm, phone: e.target.value})}
                className="w-full h-14 border border-gray-300 rounded px-4 text-base focus:border-blue-600 focus:border-2 outline-none transition-colors"
              />
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="text-sm font-medium text-blue-800 mb-2">
                ℹ️ Before You Submit
              </div>
              <div className="text-xs text-blue-700 leading-relaxed space-y-1">
                <div>• Ensure all details are accurate and complete</div>
                <div>• You will receive a reference number via email</div>
                <div>• HPCSA will acknowledge receipt within 48 hours</div>
                <div>• Investigation timeline: 5-7 business days for initial review</div>
                <div>• Keep your reference number for tracking purposes</div>
              </div>
            </div>
            
            <div className="space-y-3 pb-6">
              <button 
                onClick={handleComplaintSubmit}
                disabled={!complaintForm.regNumber || !complaintForm.description || !complaintForm.email}
                className="w-full h-12 bg-blue-600 text-white rounded font-medium text-sm uppercase tracking-wide hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                Submit Complaint
              </button>
              <button className="w-full h-12 bg-transparent text-blue-600 border border-blue-600 rounded font-medium text-sm uppercase tracking-wide hover:bg-blue-50 transition-colors">
                Save as Draft
              </button>
              <div className="text-center">
                <button 
                  onClick={() => {
                    setComplaintForm({
                      type: 'Professional Misconduct',
                      regNumber: '',
                      description: '',
                      email: '',
                      phone: '',
                      documents: []
                    });
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Clear Form
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <BottomNav active="settings" onNavigate={setCurrentScreen} />
      </div>
    );
  };

  const SettingsScreen = () => {
    const handleSettingClick = (setting) => {
      alert(`${setting} settings would open here`);
    };

    const settingsItems = [
      { icon: '👤', title: 'Profile Settings', subtitle: 'Update personal information and preferences', action: 'profile' },
      { icon: '🔔', title: 'Notifications', subtitle: 'Manage push notifications and email alerts', action: 'notifications' },
      { icon: '🔒', title: 'Privacy & Security', subtitle: 'Biometric login, PIN, and data privacy settings', action: 'security' },
      { icon: '💳', title: 'Payment Methods', subtitle: 'Manage saved payment options and billing', action: 'payments' },
      { icon: '📄', title: 'Documents', subtitle: 'Access downloaded certificates and letters', action: 'documents' },
      { icon: '🌍', title: 'Language', subtitle: 'Choose your preferred language', action: 'language' },
      { icon: '❓', title: 'Help & Support', subtitle: 'FAQs, contact info, and user guides', action: 'help' },
      { icon: 'ℹ️', title: 'About', subtitle: 'App version, terms of service, and legal info', action: 'about' }
    ];

    return (
      <div className="flex flex-col h-full">
        <StatusBar />
        <AppBar title="Settings" showBack onBack={() => setCurrentScreen('dashboard')} />
        
        <div className="flex-1 bg-gray-50 overflow-y-auto">
          {/* User Profile Section */}
          {currentUser && !currentUser.isAdmin && (
            <div className="bg-white border-b border-gray-200">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                    👨‍⚕️
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-lg text-gray-900">{currentUser.name}</div>
                    <div className="text-sm text-gray-600">{currentUser.regNumber}</div>
                    <div className="text-sm text-gray-500">{currentUser.profession} • {currentUser.location}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Items */}
          <div className="bg-white">
            {settingsItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSettingClick(item.title)}
                className="w-full flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="w-8 h-8 mr-6 text-gray-600 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{item.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{item.subtitle}</div>
                </div>
                <div className="text-gray-400 text-lg">›</div>
              </button>
            ))}
          </div>

          {/* App Info */}
          <div className="bg-white mt-4 border-t border-gray-200">
            <div className="p-4 text-center text-sm text-gray-500 space-y-2">
              <div>HPCSA Mobile App v1.0.0</div>
              <div>© 2025 Health Professions Council of South Africa</div>
              <div>Built with React • Deployed on Vercel</div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="bg-white border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center p-4 hover:bg-red-50 transition-colors text-left"
            >
              <div className="w-8 h-8 mr-6 text-red-600 flex items-center justify-center text-xl">
                🚪
              </div>
              <div className="font-medium text-red-600">Sign Out</div>
            </button>
          </div>
        </div>
        
        <BottomNav active="settings" onNavigate={setCurrentScreen} />
      </div>
    );
  };

  // Main render logic
  const screens = {
    login: <LoginScreen />,
    dashboard: <DashboardScreen />,
    search: <SearchScreen />,
    cpd: <CPDScreen />,
    account: <AccountScreen />,
    complaint: <ComplaintScreen />,
    settings: <SettingsScreen />
  };

  return (
    <>
      <Head>
        <title>HPCSA Mobile App - Prototype</title>
        <meta name="description" content="HPCSA Mobile App Prototype for testing and demonstration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-black p-1 rounded-3xl shadow-2xl">
          <div className="w-full h-screen max-h-[640px] bg-white rounded-[20px] overflow-hidden">
            {screens[currentScreen]}
          </div>
        </div>
      </div>
    </>
  );
}
