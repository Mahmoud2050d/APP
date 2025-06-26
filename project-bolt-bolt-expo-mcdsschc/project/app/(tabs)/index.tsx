import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Settings, Bot, Wrench, Cog, ThumbsUp, ThumbsDown, Zap, Cpu, Send, Lightbulb, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const commonProblems = [
  {
    id: 1,
    title: 'صوت غريب من المحرك',
    description: 'المحرك يصدر أصوات غير طبيعية عند التشغيل',
    category: 'محركات',
    severity: 'متوسط'
  },
  {
    id: 2,
    title: 'ارتفاع درجة الحرارة',
    description: 'النظام يسخن بشكل مفرط أثناء التشغيل',
    category: 'تبريد',
    severity: 'عالي'
  },
  {
    id: 3,
    title: 'تسرب في النظام الهيدروليكي',
    description: 'وجود تسريب في الزيت الهيدروليكي',
    category: 'هيدروليك',
    severity: 'متوسط'
  },
  {
    id: 4,
    title: 'اهتزاز غير طبيعي',
    description: 'الماكينة تهتز بشكل مفرط أثناء العمل',
    category: 'ميكانيكي',
    severity: 'منخفض'
  }
];

export default function MechAIHome() {
  const [problemText, setProblemText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const handleSelectProblem = (problem: typeof commonProblems[0]) => {
    setSelectedProblem(problem.id);
    setProblemText(problem.description);
  };

  const handleSolveProblem = async () => {
    if (!problemText.trim()) return;
    
    setIsLoading(true);
    startPulseAnimation();
    
    // Simulate AI processing
    setTimeout(() => {
      const mockResponse = `بناءً على وصف المشكلة، إليك التشخيص والحل المقترح:

🔧 التشخيص:
المشكلة تبدو وكأنها مرتبطة بنظام التبريد أو الضغط في النظام الهيدروليكي.

⚙️ الحل المقترح:
1. فحص مستوى السائل الهيدروليكي
2. التأكد من سلامة الخراطيم والوصلات
3. فحص المضخة الهيدروليكية
4. تنظيف المرشحات إذا لزم الأمر

🛠️ الأدوات المطلوبة:
- مقياس ضغط
- مفتاح إنجليزي
- سائل هيدروليكي بديل

⚠️ تحذير: تأكد من إيقاف تشغيل النظام قبل البدء في أي إصلاحات.

💡 نصائح إضافية:
- قم بفحص النظام دورياً كل شهر
- احتفظ بسجل للصيانة الدورية
- استخدم قطع غيار أصلية فقط`;

      setAiResponse(mockResponse);
      setIsLoading(false);
      setShowResponse(true);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
      
      pulseAnim.stopAnimation();
      pulseAnim.setValue(1);
    }, 3000);
  };

  const handleFeedback = (isPositive: boolean) => {
    console.log('Feedback:', isPositive ? 'Positive' : 'Negative');
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'عالي': return '#ff4757';
      case 'متوسط': return '#ffa502';
      case 'منخفض': return '#2ed573';
      default: return '#00d4ff';
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.patternElement, { top: 50, left: 30 }]}>
          <Cog size={40} color="#1a1a1a" />
        </View>
        <View style={[styles.patternElement, { top: 150, right: 40 }]}>
          <Wrench size={35} color="#1a1a1a" />
        </View>
        <View style={[styles.patternElement, { bottom: 200, left: 50 }]}>
          <Settings size={30} color="#1a1a1a" />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Animated.View style={[styles.logoIcon, { transform: [{ scale: pulseAnim }] }]}>
                <Bot size={32} color="#00d4ff" />
              </Animated.View>
              <View style={styles.logoText}>
                <Text style={styles.appTitle}>MechAI</Text>
                <Text style={styles.appSubtitle}>مهندسك الذكي</Text>
              </View>
            </View>
            <View style={styles.statusIndicator}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>متصل</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Tips Section */}
          <BlurView intensity={20} style={styles.tipsSection}>
            <LinearGradient
              colors={['rgba(0, 212, 255, 0.1)', 'rgba(255, 0, 100, 0.05)']}
              style={styles.tipsGradient}
            >
              <View style={styles.tipsHeader}>
                <Lightbulb size={24} color="#00d4ff" />
                <Text style={styles.tipsTitle}>نصائح للحصول على أفضل النتائج</Text>
              </View>
              <Text style={styles.tipsText}>
                • اكتب وصفاً مفصلاً للمشكلة{'\n'}
                • اذكر نوع الماكينة أو النظام{'\n'}
                • حدد متى بدأت المشكلة{'\n'}
                • اذكر أي أصوات أو علامات غريبة
              </Text>
            </LinearGradient>
          </BlurView>

          {/* Common Problems Section */}
          <View style={styles.commonProblemsSection}>
            <Text style={styles.sectionTitle}>المشاكل الشائعة</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.problemsScroll}
            >
              {commonProblems.map((problem) => (
                <TouchableOpacity
                  key={problem.id}
                  style={[
                    styles.problemCard,
                    selectedProblem === problem.id && styles.problemCardSelected
                  ]}
                  onPress={() => handleSelectProblem(problem)}
                >
                  <BlurView intensity={30} style={styles.problemCardBlur}>
                    <View style={styles.problemCardContent}>
                      <View style={styles.problemHeader}>
                        <Text style={styles.problemTitle}>{problem.title}</Text>
                        <View style={[
                          styles.severityBadge,
                          { backgroundColor: getSeverityColor(problem.severity) }
                        ]}>
                          <Text style={styles.severityText}>{problem.severity}</Text>
                        </View>
                      </View>
                      <Text style={styles.problemDescription}>{problem.description}</Text>
                      <Text style={styles.problemCategory}>{problem.category}</Text>
                    </View>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Input Section */}
          <BlurView intensity={20} style={styles.inputSection}>
            <LinearGradient
              colors={['rgba(0, 212, 255, 0.1)', 'rgba(255, 0, 100, 0.05)']}
              style={styles.inputGradient}
            >
              <Text style={styles.inputLabel}>اكتب وصف المشكلة بالتفصيل</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.textInput}
                  value={problemText}
                  onChangeText={setProblemText}
                  placeholder="مثال: المحرك يصدر صوت غريب عند التشغيل، بدأ الصوت منذ أسبوع، يحدث عند السرعة العالية..."
                  placeholderTextColor="#666"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
                <View style={styles.inputIcon}>
                  <Cpu size={20} color="#00d4ff" />
                </View>
              </View>
              <View style={styles.inputStats}>
                <Text style={styles.inputStatsText}>
                  {problemText.length} حرف • كلما زادت التفاصيل، كانت النتائج أفضل
                </Text>
              </View>
            </LinearGradient>
          </BlurView>

          {/* Solve Button */}
          <TouchableOpacity
            style={[styles.solveButton, isLoading && styles.solveButtonLoading]}
            onPress={handleSolveProblem}
            disabled={isLoading || !problemText.trim()}
          >
            <LinearGradient
              colors={isLoading ? ['#333', '#555'] : ['#00d4ff', '#0099cc']}
              style={styles.solveButtonGradient}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <Animated.View style={[styles.loadingIcon, { transform: [{ scale: pulseAnim }] }]}>
                    <Zap size={24} color="#fff" />
                  </Animated.View>
                  <Text style={styles.solveButtonText}>جاري التحليل...</Text>
                </View>
              ) : (
                <View style={styles.buttonContent}>
                  <Send size={24} color="#fff" />
                  <Text style={styles.solveButtonText}>حل المشكلة</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* AI Response Section */}
          {showResponse && (
            <Animated.View style={[styles.responseSection, { opacity: fadeAnim }]}>
              <BlurView intensity={30} style={styles.responseContainer}>
                <LinearGradient
                  colors={['rgba(0, 212, 255, 0.1)', 'rgba(0, 0, 0, 0.3)']}
                  style={styles.responseGradient}
                >
                  <View style={styles.responseHeader}>
                    <Bot size={28} color="#00d4ff" />
                    <Text style={styles.responseTitle}>الحل المقترح</Text>
                    <View style={styles.confidenceBadge}>
                      <CheckCircle size={16} color="#2ed573" />
                      <Text style={styles.confidenceText}>دقة عالية</Text>
                    </View>
                  </View>
                  <Text style={styles.responseText}>{aiResponse}</Text>
                </LinearGradient>
              </BlurView>

              {/* Feedback Section */}
              <View style={styles.feedbackSection}>
                <Text style={styles.feedbackTitle}>هل كان هذا مفيدًا؟</Text>
                <View style={styles.feedbackButtons}>
                  <TouchableOpacity
                    style={styles.feedbackButton}
                    onPress={() => handleFeedback(true)}
                  >
                    <ThumbsUp size={20} color="#00d4ff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.feedbackButton}
                    onPress={() => handleFeedback(false)}
                  >
                    <ThumbsDown size={20} color="#ff6b6b" />
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          )}
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
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  patternElement: {
    position: 'absolute',
    opacity: 0.1,
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoText: {
    alignItems: 'flex-start',
  },
  appTitle: {
    fontSize: 24,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    letterSpacing: 1,
  },
  appSubtitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#00d4ff',
    marginTop: -2,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00ff88',
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#00ff88',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  tipsSection: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
  },
  tipsGradient: {
    padding: 20,
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipsTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
    marginLeft: 10,
  },
  tipsText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#e0e0e0',
    lineHeight: 22,
    textAlign: 'right',
  },
  commonProblemsSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'right',
  },
  problemsScroll: {
    flexDirection: 'row',
  },
  problemCard: {
    width: 280,
    marginRight: 15,
    borderRadius: 15,
    overflow: 'hidden',
  },
  problemCardSelected: {
    borderWidth: 2,
    borderColor: '#00d4ff',
  },
  problemCardBlur: {
    flex: 1,
  },
  problemCardContent: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  problemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  problemTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
    flex: 1,
    textAlign: 'right',
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  severityText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  problemDescription: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 10,
    textAlign: 'right',
  },
  problemCategory: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#00d4ff',
    textAlign: 'right',
  },
  inputSection: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 25,
  },
  inputGradient: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 18,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'right',
  },
  inputContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 15,
    paddingRight: 50,
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#fff',
    textAlign: 'right',
    minHeight: 150,
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 255, 0.3)',
  },
  inputIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  inputStats: {
    alignItems: 'flex-end',
  },
  inputStatsText: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#666',
  },
  solveButton: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 30,
    elevation: 5,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  solveButtonLoading: {
    elevation: 2,
    shadowOpacity: 0.1,
  },
  solveButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    marginRight: 10,
  },
  solveButtonText: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 10,
  },
  responseSection: {
    marginBottom: 30,
  },
  responseContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  responseGradient: {
    padding: 20,
  },
  responseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  responseTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 10,
    flex: 1,
  },
  confidenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(46, 213, 115, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  confidenceText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#2ed573',
    marginLeft: 4,
  },
  responseText: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#e0e0e0',
    lineHeight: 28,
    textAlign: 'right',
  },
  feedbackSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  feedbackButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  feedbackButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
});