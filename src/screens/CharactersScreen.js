import { useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS, DEBOUNCE_MS } from '../config/constants';
import { getCharacters } from '../services/charactersService';
import CharacterCard from '../components/CharacterCard';
import StateMessage from '../components/StateMessage';

const Separator = () => <View style={styles.separator} />;

export default function CharactersScreen() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [retry, setRetry] = useState(0);
  const requestVersion = useRef(0);
  const busy = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => setSearch(input.trim()), DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [input]);

  useEffect(() => {
    const controller = new AbortController();
    const version = ++requestVersion.current;
    busy.current = false;
    setLoading(true);
    setLoadingMore(false);
    setRefreshing(false);
    setCharacters([]);
    setError('');
    setPage(1);
    setHasNextPage(false);

    async function loadFirstPage() {
      try {
        const data = await getCharacters({ page: 1, name: search, signal: controller.signal });
        if (version !== requestVersion.current) return;
        setCharacters(data.results);
        setHasNextPage(data.hasNextPage);
      } catch (err) {
        if (version === requestVersion.current && !controller.signal.aborted) {
          setError(err.message || 'No hay conexión.');
        }
      } finally {
        if (version === requestVersion.current && !controller.signal.aborted) setLoading(false);
      }
    }
    loadFirstPage();
    return () => controller.abort();
  }, [search, retry]);

  async function loadMore(force = false) {
    if (busy.current || loading || loadingMore || refreshing || !hasNextPage || (!force && error) || input.trim() !== search) return;
    busy.current = true;
    setLoadingMore(true);
    const version = requestVersion.current;
    const next = page + 1;
    try {
      const data = await getCharacters({ page: next, name: search });
      if (version !== requestVersion.current) return;
      setCharacters((previous) => [...previous, ...data.results]);
      setPage(next);
      setHasNextPage(data.hasNextPage);
    } catch (err) {
      if (version === requestVersion.current) setError(err.message || 'No se pudo cargar más.');
    } finally {
      busy.current = false;
      if (version === requestVersion.current) setLoadingMore(false);
    }
  }

  async function refresh() {
    if (refreshing || loading) return;
    const version = ++requestVersion.current;
    busy.current = true;
    setRefreshing(true);
    setError('');
    try {
      const data = await getCharacters({ page: 1, name: search });
      if (version !== requestVersion.current) return;
      setCharacters(data.results);
      setPage(1);
      setHasNextPage(data.hasNextPage);
    } catch (err) {
      if (version === requestVersion.current) setError(err.message || 'No se pudo actualizar.');
    } finally {
      busy.current = false;
      if (version === requestVersion.current) setRefreshing(false);
    }
  }

  const retryLoad = () => {
    if (characters.length > 0) {
      setError('');
      loadMore(true);
    } else setRetry((current) => current + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty</Text>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Buscar personaje..."
        placeholderTextColor={COLORS.textMuted}
        autoCorrect={false}
      />
      {loading ? (
        <ActivityIndicator style={styles.loader} color={COLORS.primary} size="large" />
      ) : error && characters.length === 0 ? (
        <StateMessage message={error} actionLabel="Reintentar" onAction={retryLoad} />
      ) : (
        <FlatList
          data={characters}
          renderItem={({ item }) => <CharacterCard character={item} />}
          keyExtractor={(item) => String(item.id)}
          ItemSeparatorComponent={Separator}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<StateMessage message="No encontré personajes con ese nombre." />}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={refresh}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={loadingMore ? (
            <ActivityIndicator color={COLORS.primary} style={styles.footer} />
          ) : error ? (
            <StateMessage message={error} actionLabel="Reintentar" onAction={retryLoad} />
          ) : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, paddingHorizontal: 16 },
  title: { color: COLORS.primary, fontSize: 28, fontWeight: '800', marginTop: 12, marginBottom: 12 },
  input: { backgroundColor: COLORS.card, color: COLORS.text, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16, marginBottom: 12 },
  loader: { marginTop: 40 },
  separator: { height: 10 },
  listContent: { paddingBottom: 24, flexGrow: 1 },
  footer: { marginVertical: 16 },
});
