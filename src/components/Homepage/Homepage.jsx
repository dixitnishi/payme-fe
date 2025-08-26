
import Navbar from "./Navbar";


const Homepage = () => {
  const backgroundImageUrl="https://img.freepik.com/free-vector/online-money-transfer-cash-back-isometric-website-template_107791-115.jpg?w=1380&t=st=1705392747~exp=1705393347~hmac=580586267351155a38187a7387be0d96371d3c8982abb4624d7e2e0901251e7d"
  return (
    <div className="min-h-screen bg-cover bg-center relative"
    style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
      <Navbar></Navbar>
      
      <div className="container mt-96 ml-24 my-8 p-8 bg-[#F2AFEF] shadow-md rounded-lg w-1/3 h-96">
        <p className="text-[#030637]">
          Manage your finances with ease using our secure and user-friendly wallet application.
        </p>

        <div className="mt-8 text-[#720455]">
          <h2 className="text-2xl font-bold mb-4">Key Features</h2>
          <ul className="list-disc pl-4">
            <li>Secure Transactions</li>
            <li>Real-time Balance Updates</li>
            <li>Transaction History</li>
            <li>Cashbacks</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
