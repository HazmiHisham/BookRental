import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const MOCK_TRANSACTIONS = [
  {
    id: '1',
    type: 'credit',
    title: 'Rental Payment Received',
    subtitle: 'The Midnight Library · John Doe',
    amount: '+$8.00',
    date: 'Today, 2:30 PM',
    icon: 'book',
  },
  {
    id: '2',
    type: 'credit',
    title: 'Rental Payment Received',
    subtitle: 'Atomic Habits · Sarah Kim',
    amount: '+$6.50',
    date: 'Yesterday, 10:14 AM',
    icon: 'book',
  },
  {
    id: '3',
    type: 'debit',
    title: 'Withdrawal to Bank',
    subtitle: 'BDO ····4821',
    amount: '-$50.00',
    date: 'Feb 17, 9:00 AM',
    icon: 'arrow-up-circle',
  },
  {
    id: '4',
    type: 'credit',
    title: 'Rental Payment Received',
    subtitle: 'Sapiens · Marco Reyes',
    amount: '+$9.00',
    date: 'Feb 15, 4:55 PM',
    icon: 'book',
  },
  {
    id: '5',
    type: 'credit',
    title: 'Top Up',
    subtitle: 'GCash ····9203',
    amount: '+$20.00',
    date: 'Feb 12, 11:30 AM',
    icon: 'wallet',
  },
  {
    id: '6',
    type: 'debit',
    title: 'Rent Payment Sent',
    subtitle: '1984 · George Orwell',
    amount: '-$5.00',
    date: 'Feb 10, 3:20 PM',
    icon: 'book-outline',
  },
];

const QUICK_ACTIONS = [
  { id: 'topup', label: 'Top Up', icon: 'add-circle-outline', color: '#2563eb', bg: '#dbeafe' },
  { id: 'withdraw', label: 'Withdraw', icon: 'arrow-up-circle-outline', color: '#7c3aed', bg: '#f3e8ff' },
  { id: 'send', label: 'Send', icon: 'paper-plane-outline', color: '#0891b2', bg: '#e0f2fe' },
  { id: 'history', label: 'History', icon: 'time-outline', color: '#16a34a', bg: '#dcfce7' },
];

export default function Wallet({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Wallet</Text>
        <TouchableOpacity style={styles.headerAction}>
          <Ionicons name="ellipsis-horizontal" size={22} color="#111" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          {/* Card BG decoration */}
          <View style={styles.cardCircle1} />
          <View style={styles.cardCircle2} />

          <View style={styles.cardTop}>
            <View style={styles.cardBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#93c5fd" />
              <Text style={styles.cardBadgeText}>BookRent Wallet</Text>
            </View>
            <Ionicons name="eye-outline" size={20} color="rgba(255,255,255,0.7)" />
          </View>

          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>$245.00</Text>

          <View style={styles.cardStats}>
            <View style={styles.cardStat}>
              <Ionicons name="trending-up" size={14} color="#86efac" />
              <Text style={styles.cardStatText}>+$23.50 this week</Text>
            </View>
            <View style={styles.cardStatDot} />
            <Text style={styles.cardStatSubtext}>3 active rentals</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          {QUICK_ACTIONS.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickAction} activeOpacity={0.7}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.bg }]}>
                <Ionicons name={action.icon} size={22} color={action.color} />
              </View>
              <Text style={styles.quickActionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Promo Banner */}
        <TouchableOpacity style={styles.promoBanner} activeOpacity={0.85}>
          <View style={styles.promoContent}>
            <Text style={styles.promoEmoji}>🎉</Text>
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>Zero withdrawal fees this month!</Text>
              <Text style={styles.promoSub}>Withdraw to your bank for free until Feb 28</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#2563eb" />
        </TouchableOpacity>

        {/* Transactions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionList}>
            {MOCK_TRANSACTIONS.map((txn, index) => (
              <TouchableOpacity
                key={txn.id}
                style={[
                  styles.transactionRow,
                  index === MOCK_TRANSACTIONS.length - 1 && styles.transactionRowLast,
                ]}
                activeOpacity={0.6}
              >
                <View style={[
                  styles.txnIconWrap,
                  txn.type === 'credit' ? styles.txnIconCredit : styles.txnIconDebit,
                ]}>
                  <Ionicons
                    name={txn.icon}
                    size={18}
                    color={txn.type === 'credit' ? '#16a34a' : '#dc2626'}
                  />
                </View>

                <View style={styles.txnInfo}>
                  <Text style={styles.txnTitle}>{txn.title}</Text>
                  <Text style={styles.txnSub}>{txn.subtitle}</Text>
                </View>

                <View style={styles.txnRight}>
                  <Text style={[
                    styles.txnAmount,
                    txn.type === 'credit' ? styles.txnCredit : styles.txnDebit,
                  ]}>
                    {txn.amount}
                  </Text>
                  <Text style={styles.txnDate}>{txn.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Ionicons name="lock-closed-outline" size={14} color="#64748b" />
          <Text style={styles.securityText}>
            Payments are secured and held in escrow until your rental is confirmed.
          </Text>
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
    color: '#0f172a',
  },
  headerAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 110,
  },

  // Balance Card
  balanceCard: {
    backgroundColor: '#1d4ed8',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
    position: 'relative',
  },
  cardCircle1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -60,
    right: -40,
  },
  cardCircle2: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -30,
    left: 20,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  cardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  cardBadgeText: {
    fontSize: 12,
    color: '#bfdbfe',
    fontWeight: '600',
  },
  balanceLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: 6,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  balanceAmount: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: -1,
    marginBottom: 16,
  },
  cardStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cardStatText: {
    fontSize: 13,
    color: '#86efac',
    fontWeight: '600',
  },
  cardStatDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cardStatSubtext: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.55)',
  },

  // Quick Actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickAction: {
    alignItems: 'center',
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },

  // Promo
  promoBanner: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  promoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoEmoji: {
    fontSize: 28,
  },
  promoText: {
    flex: 1,
  },
  promoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 2,
  },
  promoSub: {
    fontSize: 12,
    color: '#3b82f6',
  },

  // Transactions
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  seeAll: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  transactionList: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  transactionRowLast: {
    borderBottomWidth: 0,
  },
  txnIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  txnIconCredit: {
    backgroundColor: '#dcfce7',
  },
  txnIconDebit: {
    backgroundColor: '#fee2e2',
  },
  txnInfo: {
    flex: 1,
  },
  txnTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  txnSub: {
    fontSize: 12,
    color: '#9ca3af',
  },
  txnRight: {
    alignItems: 'flex-end',
  },
  txnAmount: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  txnCredit: {
    color: '#16a34a',
  },
  txnDebit: {
    color: '#dc2626',
  },
  txnDate: {
    fontSize: 11,
    color: '#9ca3af',
  },

  // Security
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: 4,
  },
  securityText: {
    flex: 1,
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 18,
  },
});