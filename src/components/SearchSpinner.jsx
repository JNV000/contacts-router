import PropTypes from "prop-types";

// this file is not used

export default function SearchSpinner({ isSearching }) {
  return (
    <>
      <div
        id="search-spinner"
        aria-hidden
        className={
          // Show the spinner if we're searching
          !isSearching && "hidden"
        }
      />

      {/* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#live_regions */}
      <div className="sr-only" aria-live="polite"></div>
    </>
  );
}

SearchSpinner.propTypes = {
  isSearching: PropTypes.bool,
};
