import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import BookDetails from '../screens/BookDetails';
import MyRentals from '../screens/MyRentals';
import OwnerDashboard from '../screens/OwnerDashboard';
import Profile from '../screens/Profile';
import Onboarding from '../screens/Onboarding';
import BottomTabBar from '../components/BottomTabBar';
import AddBookModal from '../components/AddBookModal';
import Wallet from '../screens/Wallet';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userRole, setUserRole] = useState('reader');
  const [activeTab, setActiveTab] = useState('home');
  const [showAddBookModal, setShowAddBookModal] = useState(false);

  const handleOnboardingComplete = (role) => {
    setUserRole(role);
    setShowOnboarding(false);
  };

  const handleRoleSwitch = () => {
    setUserRole(userRole === 'reader' ? 'owner' : 'reader');
    setActiveTab('home');
  };

  const handleAddBook = () => {
    setShowAddBookModal(true);
  };

  const handleSaveBook = (bookData) => {
    console.log('New book:', bookData);
    setShowAddBookModal(false);
  };

  // Show onboarding screen first
  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        {/* Home Tab */}
        {activeTab === 'home' && (
          <Stack.Navigator>
            <Stack.Screen 
              name="Home" 
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="BookDetails" 
              component={BookDetails}
              options={{ title: 'Book Details' }}
            />
          </Stack.Navigator>
        )}

        {/* Dashboard Tab (Owner only) */}
        {activeTab === 'dashboard' && userRole === 'owner' && (
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
              {(props) => <OwnerDashboard {...props} onAddBook={handleAddBook} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <Stack.Navigator>
            <Stack.Screen
              name="Wallet"
              component={Wallet}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}

        {/* Rentals Tab */}
        {activeTab === 'rentals' && (
          <Stack.Navigator>
            <Stack.Screen 
              name="Rentals" 
              component={MyRentals}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Stack.Navigator>
            <Stack.Screen name="ProfileScreen" options={{ headerShown: false }}>
              {(props) => <Profile {...props} userRole={userRole} onRoleSwitch={handleRoleSwitch} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>

      {/* Bottom Tab Bar */}
      <BottomTabBar 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userRole={userRole}
      />

      {/* Add Book Modal */}
      <AddBookModal
        visible={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        onSave={handleSaveBook}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});