/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const initialTravellers = [
  {
    id: 1,
    name: 'Jack',
    phone: '88885555',
    bookingTime: new Date(),
    seatNumber: 'A1',
    email: 'jack@example.com',
  },
  {
    id: 2,
    name: 'Rose',
    phone: '88884444',
    bookingTime: new Date(),
    seatNumber: 'B2',
    email: 'rose@example.com',
  },
  {
    id: 3,
    name: 'Tom',
    phone: '88883333',
    bookingTime: new Date(),
    seatNumber:'A5',
    email: 'tom@example.com',
  },
  {
    id: 4,
    name: 'Amy',
    phone: '88882222',
    bookingTime: new Date(),
    seatNumber:'B1',
    email: 'amy@example.com',
  },
  {
    id: 5,
    name: 'Mike',
    phone: '88881111',
    bookingTime: new Date(),
    seatNumber:'B3',
    email: 'mike@example.com',
  },
];

function TravellerRow(props) {
  const traveller = props.traveller;
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{traveller.id}</td>
      <td>{traveller.name}</td>
      <td>{traveller.phone}</td>
      <td>{traveller.email}</td>
      <td>{traveller.seatNumber}</td>
      <td>{traveller.bookingTime.toString()}</td>
      <td>
        <button onClick={() => props.deleteTraveller(traveller.name)}>Delete</button>
      </td>
    </tr>

	  
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellerRows = props.travellers.map((traveller) => (
    <TravellerRow key={traveller.id} traveller={traveller} deleteTraveller={props.deleteTraveller} />
  ));
  
  return (
    <table className="bordered-table">
      <thead>
        <tr>
	        {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Email</th>
          <th>Seat Number</th>
          <th>Booking Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {travellerRows}
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      email: '',
      seatNumber: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateForm()) {
      this.props.bookTraveller(this.state);
      this.setState({ name: '', phone: '', email: '', seatNumber: '' });
    }
  }

  validateForm() {
    const { name, phone, email, seatNumber } = this.state;
    if (name.trim().length < 2 || name.trim().length > 50) {
      alert("Name must be between 2 and 50 characters.");
      return false;
    }
    if (!/^\d{10}$/.test(phone.trim())) {
      alert("Phone number must be 10 digits.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (!/^[A-Z]\d{1,2}$/.test(seatNumber.trim().toUpperCase())) {
      alert("Seat number must be in the format 'A1', 'B2', etc.");
      return false;
    }
    return true;
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Name"
          required
        />
        <input
          type="tel"
          name="phone"
          value={this.state.phone}
          onChange={this.handleChange}
          placeholder="Phone (10 digits)"
          required
        />
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="seatNumber"
          value={this.state.seatNumber}
          onChange={this.handleChange}
          placeholder="Seat Number (e.g., A1)"
          required
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    if (this.state.name.trim()) {
      this.props.deleteTraveller(this.state.name.trim());
      this.setState({ name: '' });
    } else {
      alert("Please enter a valid name.");
    }
  }


  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
	      {/* <input type="text" name="travellername" placeholder="Name" /> */}
        <input type="text"
          name="travellername"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Enter traveller's name"
          required
        />
        <button type="submit">Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor(props) {
	super(props);
	}
  renderSeats() {
    const { occupiedSeats } = this.props;
    const rows = 5;
    const columns = ['A', 'B'];
    const seats = [];

    // Render column headers
    seats.push(
      <div key="column-headers" className="column-headers">
        <div className="seat-placeholder"></div>
        {columns.map(col => (
          <div key={col} className="column-header">{col}</div>
        ))}
      </div>
    );

    // Render rows
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [
        <div key={`row-${row}`} className="row-number">{row}</div>
      ];

      for (let col of columns) {
        const seatNumber = `${col}${row}`;
        const isOccupied = occupiedSeats.includes(seatNumber);
        
        rowSeats.push(
          <div 
            key={seatNumber}
            className={`seat ${isOccupied ? 'occupied' : 'free'}`}
            title={seatNumber}
          ></div>
        );
      }

      seats.push(
        <div key={`row-${row}-container`} className="seat-row">
          {rowSeats}
        </div>
      );
    }

    return seats;
  }

	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    <h2>Homepage</h2>
    <div className="seating-chart-container">
          <div className="legend">
            <div className="legend-item">
              <div className="seat-sample free"></div>
              <span>Free Seat</span>
            </div>
            <div className="legend-item">
              <div className="seat-sample occupied"></div>
              <span>Occupied Seat</span>
            </div>
          </div>
          <div className="seating-chart">
            {this.renderSeats()}
          </div>
          <p>Free Seats: {this.props.freeSeats} | Occupied Seats: {this.props.totalSeats-this.props.freeSeats}</p>
        </div>
    </div>
    
      
    );
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], 
      selector: 1,
      totalSeats: 10
    };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
    this.setSelector = this.setSelector.bind(this);
  }

  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    // Check if there are available seats
    if (this.state.travellers.length >= this.state.totalSeats) {
      alert("Sorry, all seats are booked!");
      return;
    }

    // Validate passenger data
    if (!this.validatePassenger(passenger)) {
      return;
    }

    this.setState((prevState) => {
      const newTraveller = {
        id: prevState.travellers.length + 1,
        name: passenger.name.trim(),
        phone: passenger.phone.trim(),
        email: passenger.email.trim(),
        seatNumber: passenger.seatNumber.trim().toUpperCase(),
        bookingTime: new Date()
      };

      return {
        travellers: [...prevState.travellers, newTraveller]
      };
    }, () => {
      console.log('New traveller added:', passenger);
      alert(`Booking confirmed for ${passenger.name}`);
    });
  }

  validatePassenger(passenger) {
    // Name validation
    if (passenger.name.trim().length < 2 || passenger.name.trim().length > 50) {
      alert("Name must be between 2 and 50 characters.");
      return false;
    }

    // Phone validation (simple check for now)
    if (!/^\d{10}$/.test(passenger.phone.trim())) {
      alert("Phone number must be 10 digits.");
      return false;
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(passenger.email.trim())) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Seat number validation (assuming format like 'A1', 'B2', etc.)
    if (!/^[A-Z]\d{1,2}$/.test(passenger.seatNumber.trim().toUpperCase())) {
      alert("Seat number must be in the format 'A1', 'B2', etc.");
      return false;
    }

    // Check if seat is already taken
    if (this.state.travellers.some(t => t.seatNumber === passenger.seatNumber.trim().toUpperCase())) {
      alert("This seat is already taken. Please choose another seat.");
      return false;
    }

    return true;
  }


  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    this.setState((prevState) => {
      const updatedTravellers = prevState.travellers.filter(
        (traveller) => traveller.name.toLowerCase() !== passenger.toLowerCase()
      );

      if (updatedTravellers.length === prevState.travellers.length) {
        alert(`No traveller found with the name "${passenger}".`);
        return null; // No state update needed
      } else {
        alert(`Traveller "${passenger}" has been removed.`);
        return { travellers: updatedTravellers };
      }
    });
  }

  render() {
    return (
        <div>
        <h1>Ticket To Ride</h1>
	      <div className="navbar">
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <button onClick={() => this.setSelector(1)}>Home</button>
          <button onClick={() => this.setSelector(2)}>Display</button>
          <button onClick={() => this.setSelector(3)}>Add</button>
          <button onClick={() => this.setSelector(4)}>Delete</button>
          </div>
          <div className="mainContainer">
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		      {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector === 1 && <Homepage 
          freeSeats={this.state.totalSeats - this.state.travellers.length} 
          totalSeats={this.state.totalSeats}
          occupiedSeats={this.state.travellers.map(t => t.seatNumber)}/>}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector === 2 && <Display travellers={this.state.travellers} deleteTraveller={this.deleteTraveller}/>}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector === 3 && <Add bookTraveller={this.bookTraveller} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector === 4 && <Delete deleteTraveller={this.deleteTraveller} />}
          </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
