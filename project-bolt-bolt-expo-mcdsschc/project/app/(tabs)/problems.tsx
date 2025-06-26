import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Search, Filter, TriangleAlert as AlertTriangle, Wrench, Zap, Thermometer, Droplets, Volume2, ChevronRight } from 'lucide-react-native';

const problemCategories = [
  { id: 'all', name: 'الكل', icon: Filter, color: '#00d4ff' },
  { id: 'engines', name: 'محركات', icon: Zap, color: '#ff6b6b' },
  { id: 'cooling', name: 'تبريد', icon: Thermometer, color: '#4ecdc4' },
  { id: 'hydraulic', name: 'هيدروليك', icon: Droplets, color: '#45b7d1' },
  { id: 'mechanical', name: 'ميكانيكي', icon: Wrench, color: '#96ceb4' },
  { id: 'electrical', name: 'كهربائي', icon: Zap, color: '#feca57' },
  { id: 'sound', name: 'أصوات', icon: Volume2, color: '#ff9ff3' },
];

const problemsDatabase = [
  {
    id: 1,
    title: 'صوت طقطقة من المحرك',
    description: 'صوت طقطقة متكرر عند تشغيل المحرك، خاصة عند البدء البارد',
    category: 'engines',
    severity: 'عالي',
    commonCauses: ['نقص زيت المحرك', 'تآكل في المحامل', 'مشكلة في الصمامات'],
    solution: 'فحص مستوى الزيت، فحص المحامل، تنظيف الصمامات',
    tools: ['مقياس زيت', 'مفتاح شمعات', 'منظف صمامات'],
    timeEstimate: '30-60 دقيقة'
  },
  {
    id: 2,
    title: 'ارتفاع درجة حرارة المحرك',
    description: 'المحرك يسخن بسرعة ويصل لدرجات حرارة عالية',
    category: 'cooling',
    severity: 'عالي',
    commonCauses: ['نقص سائل التبريد', 'تلف المروحة', 'انسداد الرادياتير'],
    solution: 'فحص سائل التبريد، تنظيف الرادياتير، فحص المروحة',
    tools: ['مقياس حرارة', 'سائل تبريد', 'منظف رادياتير'],
    timeEstimate: '45-90 دقيقة'
  },
  {
    id: 3,
    title: 'تسرب زيت هيدروليكي',
    description: 'وجود بقع زيت تحت الماكينة، انخفاض ضغط النظام',
    category: 'hydraulic',
    severity: 'متوسط',
    commonCauses: ['تلف الخراطيم', 'تآكل الأختام', 'فقدان ربط الوصلات'],
    solution: 'استبدال الخراطيم التالفة، تغيير الأختام، ربط الوصلات',
    tools: ['مفاتيح ربط', 'أختام جديدة', 'خراطيم بديلة'],
    timeEstimate: '60-120 دقيقة'
  },
  {
    id: 4,
    title: 'اهتزاز غير طبيعي',
    description: 'الماكينة تهتز بشكل مفرط أثناء التشغيل',
    category: 'mechanical',
    severity: 'متوسط',
    commonCauses: ['عدم توازن الأجزاء الدوارة', 'تآكل المحامل', 'فقدان البراغي'],
    solution: 'إعادة توازن الأجزاء، استبدال المحامل، ربط البراغي',
    tools: ['مفاتيح ربط', 'جهاز توازن', 'محامل جديدة'],
    timeEstimate: '90-180 دقيقة'
  },
  {
    id: 5,
    title: 'انقطاع الكهرباء المتكرر',
    description: 'انقطاع متكرر في التيار الكهربائي للماكينة',
    category: 'electrical',
    severity: 'عالي',
    commonCauses: ['مشكلة في القواطع', 'تلف الأسلاك', 'زيادة الحمل'],
    solution: 'فحص القواطع، استبدال الأسلاك التالفة، توزيع الأحمال',
    tools: ['مقياس كهربائي', 'أسلاك بديلة', 'قواطع جديدة'],
    timeEstimate: '60-120 دقيقة'
  },
  {
    id: 6,
    title: 'صوت صفير عالي',
    description: 'صوت صفير مرتفع يصدر من النظام أثناء التشغيل',
    category: 'sound',
    severity: 'منخفض',
    commonCauses: ['تآكل الأحزمة', 'نقص التشحيم', 'انسداد المرشحات'],
    solution: 'استبدال الأحزمة، إضافة مواد تشحيم، تنظيف المرشحات',
    tools: ['أحزمة جديدة', 'مواد تشحيم', 'منظف مرشحات'],
    timeEstimate: '30-60 دقيقة'
  }
];

export default function ProblemsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);

  const filteredProblems = problemsDatabase.filter(problem => {
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'عالي': return '#ff4757';
      case 'متوسط': return '#ffa502';
      case 'منخفض': return '#2ed573';
      default: return '#00d4ff';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = problemCategories.find(cat => cat.id === categoryId);
    return category?.color || '#00d4ff';
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>المشاكل الشائعة</Text>
          <Text style={styles.headerSubtitle}>اكتشف الحلول للمشاكل الأكثر شيوعاً</Text>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <BlurView intensity={20} style={styles.searchBlur}>
            <View style={styles.searchInputContainer}>
              <Search size={20} color="#666" />
              <TextInput
                style={styles.searchInput}
                placeholder="ابحث عن مشكلة..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </BlurView>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {problemCategories.map((category) => {
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
                      size={24} 
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

        {/* Problems List */}
        <View style={styles.problemsList}>
          {filteredProblems.map((problem) => (
            <TouchableOpacity
              key={problem.id}
              style={styles.problemCard}
              onPress={() => setSelectedProblem(selectedProblem === problem.id ? null : problem.id)}
            >
              <BlurView intensity={20} style={styles.problemBlur}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.1)']}
                  style={styles.problemGradient}
                >
                  <View style={styles.problemHeader}>
                    <View style={styles.problemTitleContainer}>
                      <Text style={styles.problemTitle}>{problem.title}</Text>
                      <View style={styles.problemMeta}>
                        <View style={[
                          styles.severityBadge,
                          { backgroundColor: getSeverityColor(problem.severity) }
                        ]}>
                          <AlertTriangle size={12} color="#fff" />
                          <Text style={styles.severityText}>{problem.severity}</Text>
                        </View>
                        <View style={[
                          styles.categoryBadge,
                          { backgroundColor: getCategoryColor(problem.category) }
                        ]}>
                          <Text style={styles.categoryBadgeText}>
                            {problemCategories.find(cat => cat.id === problem.category)?.name}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <ChevronRight 
                      size={20} 
                      color="#666" 
                      style={[
                        styles.chevron,
                        selectedProblem === problem.id && styles.chevronRotated
                      ]}
                    />
                  </View>
                  
                  <Text style={styles.problemDescription}>{problem.description}</Text>
                  
                  {selectedProblem === problem.id && (
                    <View style={styles.problemDetails}>
                      <View style={styles.detailSection}>
                        <Text style={styles.detailTitle}>الأسباب المحتملة:</Text>
                        {problem.commonCauses.map((cause, index) => (
                          <Text key={index} style={styles.detailItem}>• {cause}</Text>
                        ))}
                      </View>
                      
                      <View style={styles.detailSection}>
                        <Text style={styles.detailTitle}>الحل المقترح:</Text>
                        <Text style={styles.detailItem}>{problem.solution}</Text>
                      </View>
                      
                      <View style={styles.detailSection}>
                        <Text style={styles.detailTitle}>الأدوات المطلوبة:</Text>
                        {problem.tools.map((tool, index) => (
                          <Text key={index} style={styles.detailItem}>• {tool}</Text>
                        ))}
                      </View>
                      
                      <View style={styles.timeEstimate}>
                        <Text style={styles.timeEstimateText}>
                          الوقت المتوقع: {problem.timeEstimate}
                        </Text>
                      </View>
                    </View>
                  )}
                </LinearGradient>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBlur: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#fff',
    textAlign: 'right',
    marginRight: 10,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  categoryCard: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  categoryCardSelected: {
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  categoryBlur: {
    flex: 1,
  },
  categoryContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  categoryText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#ccc',
    marginTop: 4,
  },
  categoryTextSelected: {
    color: '#00d4ff',
  },
  problemsList: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  problemCard: {
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  problemBlur: {
    flex: 1,
  },
  problemGradient: {
    padding: 20,
  },
  problemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  problemTitleContainer: {
    flex: 1,
  },
  problemTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 8,
  },
  problemMeta: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  severityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  severityText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  chevron: {
    marginLeft: 10,
    marginTop: 5,
  },
  chevronRotated: {
    transform: [{ rotate: '90deg' }],
  },
  problemDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#ccc',
    lineHeight: 22,
    textAlign: 'right',
    marginBottom: 15,
  },
  problemDetails: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
  },
  detailSection: {
    marginBottom: 15,
  },
  detailTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#00d4ff',
    textAlign: 'right',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#e0e0e0',
    textAlign: 'right',
    lineHeight: 20,
    marginBottom: 4,
  },
  timeEstimate: {
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  timeEstimateText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#00d4ff',
  },
});