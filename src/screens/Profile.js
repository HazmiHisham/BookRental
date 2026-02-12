import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ userRole, onRoleSwitch }) {
  const userStats = userRole === 'owner' 
    ? {
        name: 'Sarah Mitchell',
        rating: 4.8,
        stat1: { label: 'Books Listed', value: 12 },
        stat2: { label: 'Total Rentals', value: 45 },
        stat3: { label: 'Total Earned', value: '$245' }
      }
    : {
        name: 'Alex Johnson',
        rating: 4.9,
        stat1: { label: 'Books Read', value: 18 },
        stat2: { label: 'Active Rentals', value: 2 },
        stat3: { label: 'Total Spent', value: '$84' }
      };

  const menuSections = [
    {
      title: 'Account',
      items: [
        { icon: 'person-outline', label: 'Edit Profile' },
        { icon: 'star-outline', label: 'My Ratings & Reviews' },
        { icon: 'book-outline', label: 'Reading History' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: 'card-outline', label: 'Payment Methods' },
        { icon: 'notifications-outline', label: 'Notifications' },
        { icon: 'settings-outline', label: 'Settings' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help & Support' },
        { icon: 'people-outline', label: 'Community Guidelines' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userStats.name.charAt(0)}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userStats.name}</Text>
              <View style={styles.rating}>
                <Ionicons name="star" size={16} color="#facc15" />
                <Text style={styles.ratingText}>{userStats.rating} Rating</Text>
              </View>
              <View style={styles.roleBadge}>
                <Text style={[styles.roleText, userRole === 'owner' ? styles.ownerRole : styles.readerRole]}>
                  {userRole === 'owner' ? 'Book Owner' : 'Reader'}
                </Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{userStats.stat1.value}</Text>
              <Text style={styles.statLabel}>{userStats.stat1.label}</Text>
            </View>
            <View style={[styles.stat, styles.statBorder]}>
              <Text style={styles.statValue}>{userStats.stat2.value}</Text>
              <Text style={styles.statLabel}>{userStats.stat2.label}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{userStats.stat3.value}</Text>
              <Text style={styles.statLabel}>{userStats.stat3.label}</Text>
            </View>
          </View>
        </View>

        {/* Role Switch Card */}
        <View style={styles.switchCard}>
          <View style={styles.switchContent}>
            <Text style={styles.switchTitle}>
              {userRole === 'owner' ? 'Want to rent books?' : 'Have books to share?'}
            </Text>
            <Text style={styles.switchText}>
              {userRole === 'owner'
                ? 'Switch to reader mode to browse and rent books from other owners.'
                : 'Switch to owner mode to list your books and earn money.'}
            </Text>
            <TouchableOpacity style={styles.switchButton} onPress={onRoleSwitch}>
              <Text style={styles.switchButtonText}>
                Switch to {userRole === 'owner' ? 'Reader' : 'Owner'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Sections */}
        {menuSections.map((section) => (
          <View key={section.title} style={styles.menuSection}>
            <Text style={styles.menuSectionTitle}>{section.title}</Text>
            <View style={styles.menuCard}>
              {section.items.map((item, index) => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.menuItem,
                    index !== section.items.length - 1 && styles.menuItemBorder
                  ]}
                >
                  <View style={styles.menuItemLeft}>
                    <Ionicons name={item.icon} size={20} color="#666" />
                    <Text style={styles.menuItemText}>{item.label}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#666" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#dc2626" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <Text style={styles.version}>BookShare v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 24,
  },
  profileHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
  },
  roleBadge: {
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ownerRole: {
    backgroundColor: '#f3e8ff',
    color: '#7c3aed',
  },
  readerRole: {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  },
  statsRow: {
    flexDirection: 'row',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  switchCard: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#93c5fd',
    marginBottom: 24,
  },
  switchContent: {
    flex: 1,
  },
  switchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  switchText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  switchButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  switchButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    marginBottom: 24,
  },
  menuSectionTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 15,
    color: '#dc2626',
    fontWeight: '600',
  },
  version: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});