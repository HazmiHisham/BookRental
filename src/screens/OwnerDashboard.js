import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_OWNER_BOOKS = [
  {
    id: '1',
    title: 'The Midnight Library',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf',
    status: 'rented',
    rentedTo: 'John Doe',
    returnDate: 'Feb 10, 2026',
    views: 45,
  },
  {
    id: '2',
    title: 'Atomic Habits',
    cover: 'https://images.unsplash.com/photo-1670523798656-eda0ea506db6',
    status: 'available',
    views: 32,
  },
  {
    id: '3',
    title: 'Sapiens',
    cover: 'https://images.unsplash.com/photo-1733426510973-4b7b7b3afd55',
    status: 'available',
    views: 28,
  },
];

export default function OwnerDashboard({ navigation, onAddBook }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddBook}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Stats Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={styles.statIcon}>
                <Ionicons name="cash-outline" size={20} color="#2563eb" />
              </View>
              <Text style={styles.statLabel}>Earnings</Text>
            </View>
            <Text style={styles.statValue}>$245</Text>
            <View style={styles.statTrend}>
              <Ionicons name="trending-up" size={12} color="#16a34a" />
              <Text style={styles.statTrendText}>+12% this month</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, styles.statIconSecondary]}>
                <Ionicons name="book-outline" size={20} color="#7c3aed" />
              </View>
              <Text style={styles.statLabel}>Books</Text>
            </View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statSubtext}>3 currently rented</Text>
          </View>
        </View>

        {/* Active Rentals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Rentals</Text>
          {MOCK_OWNER_BOOKS.filter(book => book.status === 'rented').map((book) => (
            <View key={book.id} style={styles.rentalCard}>
              <View style={styles.bookCover}>
                <Image source={{ uri: book.cover }} style={styles.coverImage} />
              </View>
              <View style={styles.rentalInfo}>
                <Text style={styles.bookTitle}>{book.title}</Text>
                <Text style={styles.rentalMeta}>Rented to {book.rentedTo}</Text>
                <View style={styles.dueBadge}>
                  <Text style={styles.dueText}>Due: {book.returnDate}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Your Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Books</Text>
            <TouchableOpacity style={styles.addBookButton} onPress={onAddBook}>
              <Ionicons name="add" size={16} color="#2563eb" />
              <Text style={styles.addBookText}>Add Book</Text>
            </TouchableOpacity>
          </View>
          {MOCK_OWNER_BOOKS.map((book) => (
            <View key={book.id} style={styles.bookCard}>
              <View style={styles.bookCover}>
                <Image source={{ uri: book.cover }} style={styles.coverImage} />
              </View>
              <View style={styles.bookInfo}>
                <View style={styles.bookHeader}>
                  <Text style={styles.bookTitle}>{book.title}</Text>
                  <View style={[
                    styles.statusBadge,
                    book.status === 'available' ? styles.available : styles.rented
                  ]}>
                    <Text style={[
                      styles.statusText,
                      book.status === 'available' ? styles.availableText : styles.rentedText
                    ]}>
                      {book.status === 'available' ? 'Available' : 'Rented'}
                    </Text>
                  </View>
                </View>
                <View style={styles.bookMeta}>
                  <Ionicons name="eye-outline" size={16} color="#666" />
                  <Text style={styles.metaText}>{book.views} views</Text>
                  {book.status === 'rented' && book.returnDate && (
                    <>
                      <Text style={styles.metaDivider}>•</Text>
                      <Text style={styles.metaText}>Returns {book.returnDate}</Text>
                    </>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Tip Card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>💡 Tip</Text>
          <Text style={styles.tipText}>
            Books with detailed descriptions and good photos get 3x more rentals!
          </Text>
          <TouchableOpacity style={styles.tipButton} onPress={onAddBook}>
            <Text style={styles.tipButtonText}>Add More Books</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 100,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#dbeafe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statIconSecondary: {
    backgroundColor: '#f3e8ff',
  },
  statLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statTrend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statTrendText: {
    fontSize: 12,
    color: '#16a34a',
  },
  statSubtext: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addBookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addBookText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  rentalCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
  },
  bookCover: {
    width: 64,
    height: 96,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
    marginRight: 16,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  rentalInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  rentalMeta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dueBadge: {
    backgroundColor: '#fff7ed',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  dueText: {
    fontSize: 12,
    color: '#ea580c',
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
  },
  bookInfo: {
    flex: 1,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  available: {
    backgroundColor: '#dcfce7',
  },
  rented: {
    backgroundColor: '#fee2e2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  availableText: {
    color: '#15803d',
  },
  rentedText: {
    color: '#991b1b',
  },
  bookMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  metaDivider: {
    fontSize: 14,
    color: '#666',
  },
  tipCard: {
    backgroundColor: '#dbeafe',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  tipButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    alignSelf: 'flex-start',
  },
  tipButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});