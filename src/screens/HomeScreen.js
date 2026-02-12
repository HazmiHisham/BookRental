import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookCard from '../components/BookCard';

const MOCK_BOOKS = [
  {
    id: '1',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://images.unsplash.com/photo-1763768861268-cb6b54173dbf',
    price: 3,
    priceUnit: 'week',
    available: true,
    owner: { rating: 4.8, distance: '0.5 mi' },
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1670523798656-eda0ea506db6',
    price: 2.5,
    priceUnit: 'week',
    available: true,
    owner: { rating: 4.9, distance: '1.2 mi' },
  },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>BookShare</Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} />
          <Text style={[styles.locationText, { marginLeft: 4 }]}>San Francisco, CA</Text>
        </View>

        <View style={styles.search}>
          <Ionicons name="search" size={18} />
          <TextInput
            placeholder="Search books..."
            style={[styles.input, { marginLeft: 8 }]}
          />
        </View>
      </View>

      <FlatList
        data={MOCK_BOOKS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 6 }}>
            <BookCard
              book={item}
              onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingTop: 50,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  input: {
    flex: 1,
  },
  list: {
    padding: 6,
  },
});