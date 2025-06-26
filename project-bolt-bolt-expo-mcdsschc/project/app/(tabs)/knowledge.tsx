import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  BookOpen,
  Video,
  FileText,
  Download,
  Star,
  Clock,
  Users,
  ChevronRight,
  Play
} from 'lucide-react-native';

const knowledgeCategories = [
  { id: 'guides', name: 'أدلة الصيانة', icon: BookOpen, color: '#00d4ff' },
  { id: 'videos', name: 'فيديوهات تعليمية', icon: Video, color: '#ff6b6b' },
  { id: 'manuals', name: 'كتيبات فنية', icon: FileText, color: '#4ecdc4' },
  { id: 'tips', name: 'نصائح وحيل', icon: Star, color: '#feca57' },
];

const knowledgeItems = [
  {
    id: 1,
    title: 'دليل الصيانة الدورية للمحركات الديزل',
    description: 'دليل شامل لصيانة محركات الديزل وجدولة الصيانة الدورية',
    category: 'guides',
    type: 'PDF',
    duration: '45 دقيقة قراءة',
    rating: 4.8,
    downloads: 1250,
    isNew: true,
  },
  {
    id: 2,
    title: 'كيفية تشخيص أعطال النظام الهيدروليكي',
    description: 'فيديو تعليمي يوضح خطوات تشخيص وإصلاح أعطال الأنظمة الهيدروليكية',
    category: 'videos',
    type: 'فيديو',
    duration: '25 دقيقة',
    rating: 4.9,
    downloads: 890,
    isNew: false,
  },
  {
    id: 3,
    title: 'كتيب أنواع الزيوت والشحوم الصناعية',
    description: 'مرجع شامل لأنواع الزيوت والشحوم المستخدمة في الصناعة',
    category: 'manuals',
    type: 'PDF',
    duration: '30 دقيقة قراءة',
    rating: 4.7,
    downloads: 2100,
    isNew: false,
  },
  {
    id: 4,
    title: 'نصائح لتوفير الطاقة في المعدات الصناعية',
    description: 'مجموعة من النصائح العملية لتقليل استهلاك الطاقة',
    category: 'tips',
    type: 'مقال',
    duration: '15 دقيقة قراءة',
    rating: 4.6,
    downloads: 750,
    isNew: true,
  },
  {
    id: 5,
    title: 'إصلاح أعطال أنظمة التبريد',
    description: 'فيديو تطبيقي لإصلاح الأعطال الشائعة في أنظمة التبريد',
    category: 'videos',
    type: 'فيديو',
    duration: '35 دقيقة',
    rating: 4.8,
    downloads: 1100,
    isNew: false,
  },
  {
    id: 6,
    title: 'دليل السلامة في ورش الصيانة',
    description: 'إرشادات السلامة المهنية والوقاية من الحوادث',
    category: 'guides',
    type: 'PDF',
    duration: '20 دقيقة قراءة',
    rating: 4.9,
    downloads: 1800,
    isNew: false,
  },
];

export default function KnowledgeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('guides');

  const filteredItems = knowledgeItems.filter(item => item.category === selectedCategory);

  const getCategoryColor = (categoryId: string) => {
    const category = knowledgeCategories.find(cat => cat.id === categoryId);
    return category?.color || '#00d4ff';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'فيديو': return Play;
      case 'PDF': return FileText;
      case 'مقال': return BookOpen;
      default: return FileText;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>قاعدة المعرفة</Text>
          <Text style={styles.headerSubtitle}>مكتبة شاملة من الموارد التعليمية</Text>
        </LinearGradient>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {knowledgeCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  selectedCategory === category.id && styles.categoryCardSelected
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <BlurView intensity={30} style={styles.categoryBlur}>
                  <View style={[
                    styles.categoryContent,
                    selectedCategory === category.id && { backgroundColor: 'rgba(0, 212, 255, 0.2)' }
                  ]}>
                    <IconComponent 
                      size={28} 
                      color={selectedCategory === category.id ? '#00d4ff' : category.color} 
                    />
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.categoryTextSelected
                    ]}>
                      {category.name}
                    </Text>
                  </View>
                </BlurView>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Knowledge Items */}
        <View style={styles.itemsList}>
          {filteredItems.map((item) => {
            const TypeIcon = getTypeIcon(item.type);
            return (
              <TouchableOpacity key={item.id} style={styles.itemCard}>
                <BlurView intensity={20} style={styles.itemBlur}>
                  <LinearGradient
                    colors={['rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.1)']}
                    style={styles.itemGradient}
                  >
                    <View style={styles.itemHeader}>
                      <View style={styles.itemTitleContainer}>
                        <View style={styles.itemTitleRow}>
                          <Text style={styles.itemTitle}>{item.title}</Text>
                          {item.isNew && (
                            <View style={styles.newBadge}>
                              <Text style={styles.newBadgeText}>جديد</Text>
                            </View>
                          )}
                        </View>
                        <Text style={styles.itemDescription}>{item.description}</Text>
                      </View>
                      <View style={[
                        styles.typeIcon,
                        { backgroundColor: getCategoryColor(item.category) }
                      ]}>
                        <TypeIcon size={24} color="#fff" />
                      </View>
                    </View>

                    <View style={styles.itemMeta}>
                      <View style={styles.metaRow}>
                        <View style={styles.metaItem}>
                          <Clock size={16} color="#666" />
                          <Text style={styles.metaText}>{item.duration}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Star size={16} color="#feca57" />
                          <Text style={styles.metaText}>{item.rating}</Text>
                        </View>
                        <View style={styles.metaItem}>
                          <Download size={16} color="#666" />
                          <Text style={styles.metaText}>{item.downloads}</Text>
                        </View>
                      </View>
                      <View style={styles.typeBadge}>
                        <Text style={styles.typeBadgeText}>{item.type}</Text>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.downloadButton}>
                      <LinearGradient
                        colors={[getCategoryColor(item.category), getCategoryColor(item.category) + '80']}
                        style={styles.downloadButtonGradient}
                      >
                        <Text style={styles.downloadButtonText}>
                          {item.type === 'فيديو' ? 'مشاهدة' : 'تحميل'}
                        </Text>
                        <ChevronRight size={16} color="#fff" />
                      </LinearGradient>
                    </TouchableOpacity>
                  </LinearGradient>
                </BlurView>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Stats Section */}
        <BlurView intensity={20} style={styles.statsSection}>
          <LinearGradient
            colors={['rgba(0, 212, 255, 0.1)', 'rgba(0, 0, 0, 0.2)']}
            style={styles.statsGradient}
          >
            <Text style={styles.statsTitle}>إحصائيات المكتبة</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>150+</Text>
                <Text style={styles.statLabel}>مورد تعليمي</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>50+</Text>
                <Text style={styles.statLabel}>فيديو تعليمي</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>25K+</Text>
                <Text style={styles.statLabel}>تحميل</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>تقييم متوسط</Text>
              </View>
            </View>
          </LinearGradient>
        </BlurView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#00d4ff',
    textAlign: 'right',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  categoryCard: {
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
    minWidth: 120,
  },
  categoryCardSelected: {
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  categoryBlur: {
    flex: 1,
  },
  categoryContent: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#ccc',
    marginTop: 8,
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#00d4ff',
  },
  itemsList: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  itemCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  itemBlur: {
    flex: 1,
  },
  itemGradient: {
    padding: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  itemTitleContainer: {
    flex: 1,
    marginRight: 15,
  },
  itemTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'right',
    flex: 1,
  },
  newBadge: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 10,
  },
  newBadgeText: {
    fontSize: 10,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#ccc',
    textAlign: 'right',
    lineHeight: 20,
  },
  typeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 15,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#666',
  },
  typeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#00d4ff',
  },
  downloadButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  downloadButtonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  downloadButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  statsSection: {
    marginHorizontal: 20,
    marginBottom: 100,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsGradient: {
    padding: 25,
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statNumber: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#00d4ff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#ccc',
    textAlign: 'center',
  },
});