import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';

interface Planet {
  name: string;
  climate: string;
  diameter: string;
  gravity: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
  created: string;
}

const DetailStyled = styled.div`
  padding: 2rem;
`;

const PlanetDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    const getDetailPlanet = async () => {
      try {
        const res = await axios.get(`https://swapi.dev/api/planets/${id}`);
        setPlanet(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      getDetailPlanet();
    }
  }, [id]);

  if (!planet) {
    return <div>Loading...</div>;
  }

  const addWishlist = () => {
    setWishlist((prevWishlist) => [...prevWishlist, planet?.name || '']);

    toast.success('wishlist added successfully');

    localStorage.setItem('wishlist', JSON.stringify([...wishlist, planet?.name || '']));
  };

  const newDate = new Date(planet?.created);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  return (
    <DetailStyled>
      <Head>
        <title>{planet.name} Detail</title>
      </Head>
      <ToastContainer />
      <div className="flex flex-col justify-center lg:gap-32 md:gap-32 gap-10 items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="justify-center items-center text-center text-[25px] text-[black] font-bold">
            Detail Planet : {planet.name}
          </h1>
          <p className="text-sm-[10px] font-serif">Created Date: {formattedDate}</p>
        </div>

        <div className="flex flex-row  justify-center items-center lg:space-x-10 md:space-x-10 md:space-y-0 space-y-10 flex-wrap">
          <div className="flex flex-col border-2 border-slate-800 p-5 bg-gray-300 space-y-2">
            <p className="text-sm-[10px] font-serif">Climate: {planet.climate}</p>
            <p className="text-sm-[10px] font-serif">Diameter: {planet.diameter}</p>
            <p className="text-sm-[10px] font-serif">climate : {planet?.climate}</p>
            <p className="text-sm-[10px] font-serif">Diameter : {planet?.diameter}</p>
            <p className="text-sm-[10px] font-serif">gravity : {planet?.gravity}</p>
          </div>
          <div className="flex flex-col border-2 border-slate-800 p-5 bg-slate-400 space-y-2">
            <p className="text-sm-[10px] font-serif">Orbital Periode : {planet?.orbital_period}</p>
            <p className="text-sm-[10px] font-serif"> Population : {planet?.population}</p>
            <p className="text-sm-[10px] font-serif">
              Rotation Periode : {planet?.rotation_period}
            </p>
            <p className="text-sm-[10px] font-serif">Surface Water: {planet?.surface_water}</p>
            <p className="text-sm-[10px] font-serif">Terrain : {planet?.terrain}</p>
          </div>
        </div>

        <button onClick={addWishlist} className="bg-blue-500 text-white px-4 py-2 mt-2 w-[25vw]">
          Add to Wishlist
        </button>
        <Link href={{ pathname: '/WishList', query: { wishlist } }}>Go to Wishlist</Link>
      </div>
    </DetailStyled>
  );
};

export default PlanetDetail;
