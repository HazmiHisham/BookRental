import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf',
    price: 3,
    priceUnit: 'week',
    available: true,
    distance: 0.3,
    eta: '2 min walk',
    genre: 'Fiction',
    owner: { name: 'John D.', rating: 4.8, totalRentals: 34 },
    condition: 'Like New',
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1670523798656-eda0ea506db6',
    price: 2.5,
    priceUnit: 'week',
    available: true,
    distance: 0.7,
    eta: '5 min walk',
    genre: 'Self-Help',
    owner: { name: 'Sarah K.', rating: 4.9, totalRentals: 52 },
    condition: 'Good',
  },
  {
    id: '3',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794',
    price: 4,
    priceUnit: 'week',
    available: true,
    distance: 1.1,
    eta: '4 min drive',
    genre: 'History',
    owner: { name: 'Marco R.', rating: 4.7, totalRentals: 21 },
    condition: 'Like New',
  },
  {
    id: '4',
    title: 'Dune',
    author: 'Frank Herbert',
    cover: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57',
    price: 3.5,
    priceUnit: 'week',
    available: false,
    distance: 1.4,
    eta: '5 min drive',
    genre: 'Sci-Fi',
    owner: { name: 'Lena M.', rating: 4.6, totalRentals: 18 },
    condition: 'Good',
  },
  {
    id: '5',
    title: '1984',
    author: 'George Orwell',
    cover: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c',
    price: 2,
    priceUnit: 'week',
    available: true,
    distance: 2.0,
    eta: '7 min drive',
    genre: 'Dystopian',
    owner: { name: 'Alex T.', rating: 4.5, totalRentals: 45 },
    condition: 'Acceptable',
  },
  {
    id: '6',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    cover: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe',
    price: 2.5,
    priceUnit: 'week',
    available: true,
    distance: 2.8,
    eta: '10 min drive',
    genre: 'Fiction',
    owner: { name: 'Nina P.', rating: 5.0, totalRentals: 67 },
    condition: 'Like New',
  },
];

const FILTERS = ['All', 'Fiction', 'Self-Help', 'History', 'Sci-Fi', 'Dystopian'];

const CONDITION_COLOR = {
  'Like New': '#10b981',
  'Good': '#3b82f6',
  'Acceptable': '#f59e0b',
};

function DistancePill({ distance, eta, available }) {
  return (
    <View style={[styles.distancePill, !available && styles.distancePillUnavailable]}>
      <View style={[styles.distanceDot, !available && styles.distanceDotUnavailable]} />
      <Text style={[styles.distanceText, !available && styles.distanceTextUnavailable]}>
        {distance < 1 ? `${(distance * 1000).toFixed(0)}m` : `${distance.toFixed(1)} mi`}
      </Text>
      <Text style={styles.distanceSep}>·</Text>
      <Text style={[styles.etaText, !available && styles.distanceTextUnavailable]}>{eta}</Text>
    </View>
  );
}

function BookRow({ book, onPress, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      <TouchableOpacity
        style={[styles.bookRow, !book.available && styles.bookRowUnavailable]}
        onPress={() => book.available && onPress(book)}
        activeOpacity={0.75}
      >
        {/* Left: distance indicator line */}
        <View style={styles.timelineCol}>
          <View style={[styles.timelineDot, !book.available && styles.timelineDotUnavailable]} />
          <View style={[styles.timelineLine, !book.available && styles.timelineLineUnavailable]} />
        </View>

        {/* Book cover */}
        <View style={styles.coverWrap}>
          <Animated.Image
            source={{ uri: book.cover }}
            style={[styles.cover, !book.available && styles.coverUnavailable]}
          />
          {!book.available && (
            <View style={styles.unavailableOverlay}>
              <Text style={styles.unavailableText}>Rented</Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={styles.bookInfo}>
          <View style={styles.bookInfoTop}>
            <DistancePill
              distance={book.distance}
              eta={book.eta}
              available={book.available}
            />
            {book.available && (
              <View style={styles.priceBadge}>
                <Text style={styles.priceText}>${book.price}</Text>
                <Text style={styles.priceUnit}>/{book.priceUnit}</Text>
              </View>
            )}
          </View>

          <Text style={styles.bookTitle} numberOfLines={1}>{book.title}</Text>
          <Text style={styles.bookAuthor}>{book.author}</Text>

          <View style={styles.bookMeta}>
            <View style={[styles.conditionDot, { backgroundColor: CONDITION_COLOR[book.condition] }]} />
            <Text style={styles.conditionText}>{book.condition}</Text>
            <Text style={styles.metaSep}>·</Text>
            <Ionicons name="star" size={11} color="#f59e0b" />
            <Text style={styles.ratingText}>{book.owner.rating}</Text>
            <Text style={styles.metaSep}>·</Text>
            <Text style={styles.ownerName}>{book.owner.name}</Text>
          </View>
        </View>

        {/* Action */}
        {book.available && (
          <TouchableOpacity style={styles.acceptBtn} onPress={() => onPress(book)}>
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const headerAnim = useRef(new Animated.Value(0)).current;

  const filtered = MOCK_BOOKS
    .filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase());
      const matchFilter = activeFilter === 'All' || b.genre === activeFilter;
      const matchAvail = !showAvailableOnly || b.available;
      return matchSearch && matchFilter && matchAvail;
    })
    .sort((a, b) => a.distance - b.distance); // Always nearest first

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerSub}>Books near you</Text>
            <View style={styles.locationRow}>
              <Ionicons name="navigate" size={14} color="#2563eb" />
              <Text style={styles.locationText}>San Francisco, CA</Text>
              <Ionicons name="chevron-down" size={14} color="#2563eb" />
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.toggleBtn, showAvailableOnly && styles.toggleBtnActive]}
              onPress={() => setShowAvailableOnly(!showAvailableOnly)}
            >
              <Ionicons
                name={showAvailableOnly ? 'flash' : 'flash-outline'}
                size={14}
                color={showAvailableOnly ? '#fff' : '#64748b'}
              />
              <Text style={[styles.toggleLabel, showAvailableOnly && styles.toggleLabelActive]}>
                Available
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={18} color="#94a3b8" />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by title or author..."
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
            >
              <Text style={[styles.filterLabel, activeFilter === f && styles.filterLabelActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Results count */}
      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>
          {filtered.length} book{filtered.length !== 1 ? 's' : ''} found
        </Text>
        <View style={styles.sortRow}>
          <Ionicons name="location" size={12} color="#2563eb" />
          <Text style={styles.sortText}>Nearest first</Text>
        </View>
      </View>

      {/* Book list */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BookRow
            book={item}
            index={index}
            onPress={(book) => navigation.navigate('BookDetails', { bookId: book.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="book-outline" size={48} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No books found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your filters</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },

  // Header
  header: {
    backgroundColor: '#fff',
    paddingTop: 56,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  headerSub: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
    marginBottom: 2,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  toggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  toggleBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  toggleLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  toggleLabelActive: {
    color: '#fff',
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
  },

  // Filters
  filters: {
    gap: 8,
    paddingRight: 4,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748b',
  },
  filterLabelActive: {
    color: '#fff',
  },

  // Results row
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  resultsText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  sortText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '600',
  },

  // List
  list: {
    paddingHorizontal: 16,
    paddingBottom: 110,
    paddingTop: 4,
  },

  // Book row (Lalamove-style job card)
  bookRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 10,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  bookRowUnavailable: {
    opacity: 0.6,
  },

  // Timeline (the vertical line on the left like Lalamove route)
  timelineCol: {
    width: 20,
    alignItems: 'center',
    marginRight: 10,
    height: '100%',
    position: 'absolute',
    left: 14,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563eb',
    borderWidth: 2,
    borderColor: '#bfdbfe',
  },
  timelineDotUnavailable: {
    backgroundColor: '#94a3b8',
    borderColor: '#e2e8f0',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#dbeafe',
    marginTop: 4,
  },
  timelineLineUnavailable: {
    backgroundColor: '#e2e8f0',
  },

  // Cover
  coverWrap: {
    marginLeft: 28,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    width: 62,
    height: 86,
  },
  cover: {
    width: 62,
    height: 86,
    borderRadius: 10,
  },
  coverUnavailable: {
    opacity: 0.5,
  },
  unavailableOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15,23,42,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  unavailableText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Info
  bookInfo: {
    flex: 1,
    gap: 4,
  },
  bookInfoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  bookAuthor: {
    fontSize: 12,
    color: '#64748b',
  },
  bookMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  conditionDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  conditionText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  metaSep: {
    color: '#cbd5e1',
    fontSize: 11,
  },
  ratingText: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '600',
  },
  ownerName: {
    fontSize: 11,
    color: '#64748b',
  },

  // Distance pill
  distancePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  distancePillUnavailable: {
    backgroundColor: '#f1f5f9',
  },
  distanceDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#2563eb',
  },
  distanceDotUnavailable: {
    backgroundColor: '#94a3b8',
  },
  distanceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  distanceTextUnavailable: {
    color: '#94a3b8',
  },
  distanceSep: {
    fontSize: 11,
    color: '#93c5fd',
  },
  etaText: {
    fontSize: 11,
    color: '#3b82f6',
    fontWeight: '500',
  },

  // Price badge
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 1,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
  },
  priceUnit: {
    fontSize: 11,
    color: '#94a3b8',
  },

  // Accept button
  acceptBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },

  // Empty
  empty: {
    alignItems: 'center',
    paddingTop: 60,
    gap: 10,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#334155',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
});