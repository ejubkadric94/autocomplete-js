import TypeAhead from './TypeAhead/TypeAhead';
import './App.css';
import { Box } from '@mui/material';

function App() {

  const handleSelect = (selectedItem) => {
    console.log("selected item: ", selectedItem);
  };

  return (
    <Box className="app" data-testid="app" sx={styles.app}>
      <TypeAhead onSelect={handleSelect} />
    </Box>
  );
}

const styles = {
  app: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '0 30px'
  }
};

export default App;
