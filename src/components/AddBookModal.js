import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function AddBookModal({ visible, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'Fiction',
    condition: 'Good',
    price: '',
    priceUnit: 'week',
    pages: '',
    description: ''
  });

  const handleSubmit = () => {
    onSave(formData);
    // Reset form
    setFormData({
      title: '',
      author: '',
      category: 'Fiction',
      condition: 'Good',
      price: '',
      priceUnit: 'week',
      pages: '',
      description: ''
    });
  };

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
            <Text style={styles.headerTitle}>Add New Book</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {/* Book Cover Upload */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Cover</Text>
              <TouchableOpacity style={styles.uploadButton}>
                <Ionicons name="cloud-upload-outline" size={32} color="#666" />
                <Text style={styles.uploadText}>Upload cover image</Text>
              </TouchableOpacity>
            </View>

            {/* Title */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Book Title</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Enter book title"
                placeholderTextColor="#999"
              />
            </View>

            {/* Author */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Author</Text>
              <TextInput
                style={styles.input}
                value={formData.author}
                onChangeText={(text) => setFormData({ ...formData, author: text })}
                placeholder="Enter author name"
                placeholderTextColor="#999"
              />
            </View>

            {/* Category & Condition */}
            <View style={styles.formRow}>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Category</Text>
                <View style={styles.input}>
                  <Text>{formData.category}</Text>
                </View>
              </View>
              <View style={styles.formGroupHalf}>
                <Text style={styles.label}>Condition</Text>
                <View style={styles.input}>
                  <Text>{formData.condition}</Text>
                </View>
              </View>
            </View>

            {/* Price */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Rental Price</Text>
              <View style={styles.priceRow}>
                <View style={styles.priceInput}>
                  <Ionicons name="cash-outline" size={20} color="#666" style={styles.priceIcon} />
                  <TextInput
                    style={styles.priceTextInput}
                    value={formData.price}
                    onChangeText={(text) => setFormData({ ...formData, price: text })}
                    placeholder="0.00"
                    placeholderTextColor="#999"
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={styles.unitPicker}>
                  <Text>per {formData.priceUnit}</Text>
                </View>
              </View>
            </View>

            {/* Pages */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Number of Pages</Text>
              <TextInput
                style={styles.input}
                value={formData.pages}
                onChangeText={(text) => setFormData({ ...formData, pages: text })}
                placeholder="Enter page count"
                placeholderTextColor="#999"
                keyboardType="number-pad"
              />
            </View>

            {/* Description */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Add a brief description of the book..."
                placeholderTextColor="#999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Add Book</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 480,
    maxHeight: '90%',
    borderRadius: 24,
    overflow: 'hidden',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  formRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  formGroupHalf: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    fontSize: 15,
  },
  textArea: {
    height: 100,
    paddingTop: 12,
  },
  uploadButton: {
    height: 192,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadText: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  priceInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  priceIcon: {
    marginRight: 8,
  },
  priceTextInput: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 12,
  },
  unitPicker: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
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
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#2563eb',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});