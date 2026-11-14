import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import ProfileScreen from './src/screens/ProfileScreen';
import CharactersScreen from './src/screens/CharactersScreen';

export default function App() {
  const [section, setSection] = useState('profile');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.nav}>
          <Pressable onPress={() => setSection('profile')} style={[styles.tab, section === 'profile' && styles.selected]}>
            <Text style={[styles.tabText, section === 'profile' && styles.selectedText]}>Mi perfil</Text>
          </Pressable>
          <Pressable onPress={() => setSection('characters')} style={[styles.tab, section === 'characters' && styles.selected]}>
            <Text style={[styles.tabText, section === 'characters' && styles.selectedText]}>Rick and Morty</Text>
          </Pressable>
        </View>
        <View style={styles.content}>
          {section === 'profile' ? <ProfileScreen /> : <CharactersScreen />}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#EEF1F6' },
  nav: { flexDirection: 'row', padding: 10, gap: 8, backgroundColor: '#FFFFFF' },
  tab: { flex: 1, paddingVertical: 12, borderRadius: 10, alignItems: 'center', backgroundColor: '#EEF1F6' },
  selected: { backgroundColor: '#2F6FED' },
  tabText: { fontSize: 14, fontWeight: '600', color: '#374151' },
  selectedText: { color: '#FFFFFF' },
  content: { flex: 1 },
});
