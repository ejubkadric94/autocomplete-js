import { Box, Chip, Typography } from "@mui/material";

const SelectedItems = ({ selectedItems }) => {
  if (!selectedItems.length) {
    return null;
  }

  return (
    <>
      <Typography sx={{ marginTop: '4px' }}>Selected items:</Typography>
      <Box component="ul" role="list" sx={styles.listContainer}>
        {selectedItems.map((item) => (
          <Box key={item.id} role="listitem" component="li" sx={styles.listItem} tabIndex={0}>
            <Chip variant="outlined" label={item.name} />
          </Box>
        ))}
      </Box>
    </>
  );
};

const styles = {
  listContainer: {
    display: 'flex',
    flexFlow: 'row',
    listStyleType: 'none',
    padding: '4px',
    margin: '8px 0'
  },
  listItem: {
    marginRight: '8px'
  }
}

export default SelectedItems;
