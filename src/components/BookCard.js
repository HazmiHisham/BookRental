import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BookCard({ book, onPress }) {
  const isAvailable = book.available;
  const coverUri = book.cover || 'https://via.placeholder.com/150';
  const owner = book.owner || { rating: 0, distance: 'N/A' };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: coverUri }} style={styles.image} />

        {!isAvailable && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Rented</Text>
          </View>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>{book.title || 'Untitled'}</Text>
        <Text style={styles.author}>{book.author || 'Unknown Author'}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${book.price ?? '-'}</Text>
          <Text style={styles.unit}>/{book.priceUnit || '?'}</Text>
        </View>

        <View style={styles.ownerRow}>
          <Ionicons name="star" size={12} color="#facc15" />
          <Text style={[styles.smallText, { marginLeft: 4, marginRight: 8 }]}>{owner.rating}</Text>

          <Ionicons name="location-outline" size={12} />
          <Text style={[styles.smallText, { marginLeft: 4 }]}>{owner.distance}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
  },
  imageContainer: {
    aspectRatio: 3 / 4,
    backgroundColor: '#e5e7eb',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  info: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 12,
    color: '#666',
  },
  ownerRow: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  smallText: {
    fontSize: 11,
    color: '#666',
  },
});