import { CircularProgress, IconButton, TextField } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';

const SearchBar = ({
  loading,
  query,
  setSearchQuery,
}: {
  loading: boolean;
  query: string;
  setSearchQuery: (query: string) => void;
}) => (
  <>
    <TextField
      id="search-bar"
      className="text"
      value={query}
      InputProps={{
        startAdornment: <Search />,
        endAdornment: loading ? (
          <CircularProgress />
        ) : (
          <IconButton type="submit" aria-label="search" onClick={() => setSearchQuery('')}>
            <Clear style={{ fill: 'grey' }} />
          </IconButton>
        ),
      }}
      onInput={(e) => {
        setSearchQuery((e.target as any).value);
      }}
      label="Search for a product"
      variant="outlined"
      placeholder="Search..."
      size="small"
    />
  </>
);

export default SearchBar;
