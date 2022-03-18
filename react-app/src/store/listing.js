const LOAD_LISTINGS = 'listings/LOAD_LISTINGS';
const CREATE_LISTING = 'listings/CREATE_LISTING';
const EDIT_LISTING = 'listings/EDIT_LISTING';
const DELETE_LISTING = 'listings/DELETE_LISTING';

const load = (listings) => ({
	type: LOAD_LISTINGS,
	listings,
});

const create = (newListing) => ({
	type: CREATE_LISTING,
	newListing,
});

const edit = (listing) => ({
	type: EDIT_LISTING,
	editedListing: listing,
});

const remove = (listing) => ({
	type: DELETE_LISTING,
	deletedListing: listing,
});


export const getListings = () => async dispatch => {
	const res = await fetch('/api/listings/')
	if (res.ok) {
		const listings = await res.json()
		dispatch(load(listings))
	} else {
		const errors = await res.json();
		return errors;
	}
}


export const createListing = (listing) => async (dispatch) => {
	// console.log('LISTING', listing)
	const res = await fetch('/api/listings/', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(listing),
	});
	if (res.ok) {
		const newListing = await res.json();
		// console.log('NEW', newListing)
		dispatch(create(newListing));
		return newListing;
	} else {
		const errors = await res.json();
		return errors;
	}
};

export const editListing = (listing) => async (dispatch) => {
	console.log('LISTING', listing)
	const res = await fetch(`/api/listings/${listing.id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(listing),
	});
	if (res.ok) {
		const editedListing = await res.json();
		dispatch(edit(editedListing));
		// console.log('EDIT', editedListing);
		return editedListing;
	} else {
		const errors = await res.json();
		return errors;
	}
};

export const deleteProduct = (listing) => async (dispatch) => {
	const res = await fetch(`/api/listing/${listing.id}`, {
		method: 'DELETE',
		body: JSON.stringify(listing),
	});
	if (res.ok) {
		const deletedListing = await res.json();
		dispatch(remove(deletedListing));
		return deletedListing;
	} else {
		const errors = await res.json();
		return errors;
	}
};

let initialState = {};

const listingsReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case LOAD_LISTINGS: {
			newState = { ...state };
			action.listings.all_listings.forEach((listing) => {
				newState[listing.id] = listing;
			});
			return newState;
		}

		case CREATE_LISTING: {
			return { [action.newListing.id]: action.newListing, ...state };
		}

		case EDIT_LISTING: {
			newState = { ...state }
			newState[action.editedListing.id]= action.editedListing;
			return newState;
		}

		case DELETE_LISTING: {
			newState = { ...state };
			delete newState[action.deletedListing.id];
			return newState;
		}
		default:
			return state;
	}
};

export default listingsReducer;
