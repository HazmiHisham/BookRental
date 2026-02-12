import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RentModal({ visible, book, onClose, onConfirm }) {
  if (!book) return null;

  const rentalDuration = book.priceUnit === 'week' ? 2 : 14;
  const totalPrice = book.priceUnit === 'week' ? book.price * 2 : book.price * 14;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Confirm Rental</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Book Info */}
          <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookAuthor}>{book.author}</Text>
            <View style={styles.ownerInfo}>
              <Ionicons name="location-outline" size={16} color="#666" />
              <Text style={styles.ownerText}>
                {book.owner.name} • {book.owner.distance}
              </Text>
            </View>
          </View>

          {/* Rental Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailCard}>
              <Ionicons name="calendar-outline" size={20} color="#2563eb" />
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>{rentalDuration} days</Text>
              </View>
            </View>

            <View style={styles.detailCard}>
              <Ionicons name="cash-outline" size={20} color="#2563eb" />
              <View style={styles.detailInfo}>
                <Text style={styles.detailLabel}>Total Cost</Text>
                <Text style={styles.detailValue}>${totalPrice.toFixed(2)}</Text>
              </View>
            </View>
          </View>

          {/* Rental Terms */}
          <View style={styles.termsCard}>
            <Text style={styles.termsText}>
              ✓ Pick up within 48 hours{'\n'}
              ✓ Return by due date to avoid late fees{'\n'}
              ✓ Keep book in good condition
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmButtonText}>Confirm Rental</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookInfo: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
    margin: 24,
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ownerText: {
    fontSize: 14,
    color: '#666',
  },
  detailsSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
    gap: 12,
  },
  detailCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 16,
  },
  detailInfo: {
    marginLeft: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  termsCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});