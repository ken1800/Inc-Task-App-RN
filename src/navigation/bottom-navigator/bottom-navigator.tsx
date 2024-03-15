import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import palette from '../../../palette';

export interface Tab {
  name: string;
  component: React.FC | React.ComponentType;
  icon: string;
}

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size }: { name: string; color: string; size: number }) => {
  return <Icon name={name} color={color} size={size} />;
};

const renderTabBarIcon = (tabIconName: string) => {
  return ({ color, size }: { color: string; size: number }) => (
    <TabIcon name={tabIconName} color={color} size={size} />
  );
};

function BottomTabs({ tabs }: { tabs: Tab[] }) {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: palette.defaultTheme,
          height: 60 + insets.bottom,
          paddingBottom: 5,
          position: 'absolute',
          opacity: 0.97,
        },
        tabBarActiveTintColor: palette.white,
        tabBarInactiveTintColor: palette.inactiveTab,
        headerShown: false,
      }}
    >
      {tabs.map((tab, index) => {
        return (
          <Tab.Screen
            key={index}
            name={tab.name}
            options={{
              tabBarIcon: renderTabBarIcon(tab.icon),
            }}
            component={tab.component}
          />
        );
      })}
    </Tab.Navigator>
  );
}

interface Props {
  tabs: Tab[];
}

export const BottomTabsNavigator = ({ tabs }: Props) => {
  return <BottomTabs tabs={tabs} />;
};
