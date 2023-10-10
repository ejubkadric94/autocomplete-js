# TypeAhead Component

The TypeAhead component is a flexible and customizable autocomplete input component for React applications. It allows users to easily search and select items from a list of suggestions, making data entry and selection more user-friendly.

## Running
```
npm install
npm start
```

## Testing
```
npm install
npm test
```

## Sample usage
```
<TypeAhead
  placeholder="Your placeholder text"
  classname="custom-classname"
  onSelect={handleSelect}
  multipleSelections={false}
/>
```

## Drawbacks
- Trivial UI design
- Show some kind of error in case when `multipleSelections` prop is false, and a selection is made