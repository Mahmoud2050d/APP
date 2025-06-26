import { Tabs } from 'expo-router';
import { Bot, Search, BookOpen, Settings } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0a0a0a',
          borderTopColor: 'rgba(0, 212, 255, 0.3)',
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#00d4ff',
        tabBarInactiveTintColor: '#666',
        tabBarLabelStyle: {
          fontFamily: 'Cairo-SemiBold',
          fontSize: 12,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ size, color }) => (
            <Bot size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="problems"
        options={{
          title: 'المشاكل الشائعة',
          tabBarIcon: ({ size, color }) => (
            <Search size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="knowledge"
        options={{
          title: 'المعرفة',
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'الإعدادات',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}