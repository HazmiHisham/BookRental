import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomTabBar({ activeTab, onTabChange, userRole }) {
  const tabs = userRole === 'owner' 
    ? [
        { id: 'home', label: 'Browse', icon: 'home-outline' },
        { id: 'dashboard', label: 'Dashboard', icon: 'grid-outline' },
        { id: 'rentals', label: 'Rentals', icon: 'book-outline' },
        { id: 'profile', label: 'Profile', icon: 'person-outline' },
      ]
    : [
        { id: 'home', label: 'Browse', icon: 'home-outline' },
        { id: 'rentals', label: 'My Rentals', icon: 'book-outline' },
        { id: 'profile', label: 'Profile', icon: 'person-outline' },
      ];

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tab}
              onPress={() => onTabChange(tab.id)}
            >
              <Ionicons 
                name={tab.icon} 
                size={20} 
                color={isActive ? '#2563eb' : '#666'} 
              />
              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabLabelActive: {
    color: '#2563eb',
    fontWeight: '600',
  },
});