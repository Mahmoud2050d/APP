import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Settings, User, Bell, Shield, Palette, Globe, CircleHelp as HelpCircle, Info, LogOut, ChevronRight, Moon, Volume2, Smartphone } from 'lucide-react-native';

const settingsCategories = [
  {
    title: 'الحساب',
    items: [
      { id: 'profile', title: 'الملف الشخصي', icon: User, type: 'navigation' },
      { id: 'notifications', title: 'الإشعارات', icon: Bell, type: 'toggle', value: true },
      { id: 'privacy', title: 'الخصوصية والأمان', icon: Shield, type: 'navigation' },
    ]
  },
  {
    title: 'التطبيق',
    items: [
      { id: 'theme', title: 'المظهر', icon: Palette, type: 'navigation', subtitle: 'داكن' },
      { id: 'language', title: 'اللغة', icon: Globe, type: 'navigation', subtitle: 'العربية' },
      { id: 'sound', title: 'الأصوات', icon: Volume2, type: 'toggle', value: true },
      { id: 'offline', title: 'الوضع غير المتصل', icon: Smartphone, type: 'toggle', value: false },
    ]
  },
  {
    title: 'الدعم',
    items: [
      { id: 'help', title: 'المساعدة والدعم', icon: HelpCircle, type: 'navigation' },
      { id: 'about', title: 'حول التطبيق', icon: Info, type: 'navigation' },
    ]
  }
];

export default function SettingsScreen() {
  const [toggleStates, setToggleStates] = useState<{[key: string]: boolean}>({
    notifications: true,
    sound: true,
    offline: false,
  });

  const handleToggle = (id: string) => {
    setToggleStates(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const renderSettingItem = (item: any) => {
    const IconComponent = item.icon;
    
    return (
      <TouchableOpacity key={item.id} style={styles.settingItem}>
        <BlurView intensity={20} style={styles.settingBlur}>
          <View style={styles.settingContent}>
            <View style={styles.settingLeft}>
              <View style={styles.settingIcon}>
                <IconComponent size={20} color="#00d4ff" />
              </View>
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                {item.subtitle && (
                  <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                )}
              </View>
            </View>
            
            <View style={styles.settingRight}>
              {item.type === 'toggle' ? (
                <Switch
                  value={toggleStates[item.id]}
                  onValueChange={() => handleToggle(item.id)}
                  trackColor={{ false: '#333', true: '#00d4ff' }}
                  thumbColor={toggleStates[item.id] ? '#fff' : '#666'}
                />
              ) : (
                <ChevronRight size={20} color="#666" />
              )}
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#0a0a0a', '#1a1a1a']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>الإعدادات</Text>
          <Text style={styles.headerSubtitle}>تخصيص تجربة استخدام التطبيق</Text>
        </LinearGradient>

        {/* User Profile Card */}
        <View style={styles.profileSection}>
          <BlurView intensity={30} style={styles.profileBlur}>
            <LinearGradient
              colors={['rgba(0, 212, 255, 0.1)', 'rgba(0, 0, 0, 0.2)']}
              style={styles.profileGradient}
            >
              <View style={styles.profileContent}>
                <View style={styles.profileAvatar}>
                  <User size={32} color="#00d4ff" />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>مهندس محمد أحمد</Text>
                  <Text style={styles.profileEmail}>engineer@example.com</Text>
                  <View style={styles.profileBadge}>
                    <Text style={styles.profileBadgeText}>عضو مميز</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.editProfileButton}>
                  <Text style={styles.editProfileText}>تعديل</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </BlurView>
        </View>

        {/* Settings Categories */}
        <View style={styles.settingsContainer}>
          {settingsCategories.map((category, categoryIndex) => (
            <View key={categoryIndex} style={styles.categorySection}>
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <View style={styles.categoryItems}>
                {category.items.map(renderSettingItem)}
              </View>
            </View>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <BlurView intensity={20} style={styles.appInfoBlur}>
            <View style={styles.appInfoContent}>
              <Text style={styles.appInfoTitle}>MechAI - مهندسك الذكي</Text>
              <Text style={styles.appInfoVersion}>الإصدار 1.0.0</Text>
              <Text style={styles.appInfoDescription}>
                مساعد ذكي متخصص في حل المشاكل الهندسية والميكانيكية
              </Text>
            </View>
          </BlurView>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <BlurView intensity={20} style={styles.logoutBlur}>
            <LinearGradient
              colors={['rgba(255, 107, 107, 0.2)', 'rgba(255, 107, 107, 0.1)']}
              style={styles.logoutGradient}
            >
              <LogOut size={20} color="#ff6b6b" />
              <Text style={styles.logoutText}>تسجيل الخروج</Text>
            </LinearGradient>
          </BlurView>
        </TouchableOpacity>
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
  profileSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  profileBlur: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    padding: 20,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 212, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#ccc',
    textAlign: 'right',
    marginBottom: 8,
  },
  profileBadge: {
    backgroundColor: 'rgba(0, 212, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-end',
  },
  profileBadgeText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#00d4ff',
  },
  editProfileButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  editProfileText: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#00d4ff',
  },
  settingsContainer: {
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    textAlign: 'right',
    marginBottom: 15,
  },
  categoryItems: {
    gap: 10,
  },
  settingItem: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  settingBlur: {
    flex: 1,
  },
  settingContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
    textAlign: 'right',
  },
  settingSubtitle: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#666',
    textAlign: 'right',
    marginTop: 2,
  },
  settingRight: {
    marginLeft: 10,
  },
  appInfoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  appInfoBlur: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  appInfoContent: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
  },
  appInfoTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 5,
  },
  appInfoVersion: {
    fontSize: 14,
    fontFamily: 'Cairo-SemiBold',
    color: '#00d4ff',
    marginBottom: 10,
  },
  appInfoDescription: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 18,
  },
  logoutButton: {
    marginHorizontal: 20,
    marginBottom: 100,
    borderRadius: 15,
    overflow: 'hidden',
  },
  logoutBlur: {
    flex: 1,
  },
  logoutGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#ff6b6b',
  },
});