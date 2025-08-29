import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

/**
 * 404 Not Found screen component
 * 
 * This component:
 * - Displays when users navigate to non-existent routes
 * - Provides a link back to the home screen
 * - Uses themed components for consistent styling
 * 
 * @returns {JSX.Element} The not found screen with navigation link
 */
export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>Go to home screen!</Text>
      </Link>
    </View>
  );
}

/**
 * Styles for the not found screen
 * 
 * @type {StyleSheet.NamedStyles<any>}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
