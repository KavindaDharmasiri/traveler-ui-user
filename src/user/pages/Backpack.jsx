import React, { useState, useEffect } from 'react'
import ItemCard from '../component/Backpack/ItemCard'
import Summary from '../component/Backpack/Summary';
import {API_CONFIG} from "../../config/environment.js";
import axios from '../api/axios';
import Swal from 'sweetalert2';

export default function Backpack() {
  const [backpackItems, setBackpackItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageMapper, setImageMapper] = useState({});

  const fetchImages = async (imageUuids) => {
    const mapper = {};
    for (const uuid of imageUuids) {
      try {
        const response = await axios.get(`storage/files/download/${uuid}`, {
          responseType: 'blob'
        });
        mapper[uuid] = URL.createObjectURL(response.data);
      } catch (error) {
        console.error(`Error fetching image ${uuid}:`, error);
      }
    }
    return mapper;
  };

  useEffect(() => {
    fetchBackpackItems();
  }, []);

  const fetchBackpackItems = async () => {
    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}core/api/v1/backpack/all`);
      const data = response.data;
      
      // Collect all image UUIDs from items
      const allImageUuids = [];
      data.forEach(backpackItem => {
        if (backpackItem.item?.images) {
          allImageUuids.push(...backpackItem.item.images);
        }
      });
      
      // Fetch all images at once
      if (allImageUuids.length > 0) {
        const mapper = await fetchImages([...new Set(allImageUuids)]);
        setImageMapper(mapper);
      }
      
      setBackpackItems(data);
    } catch (error) {
      console.error('Failed to fetch backpack items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const result = await Swal.fire({
        title: 'Remove Item?',
        text: 'Are you sure you want to remove this item from your backpack?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, remove it!'
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_CONFIG.BASE_URL}core/api/v1/backpack/delete/${itemId}`);
        setBackpackItems(prev => prev.filter(item => item.id !== itemId));
        Swal.fire('Removed!', 'Item has been removed from your backpack.', 'success');
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
      Swal.fire('Error!', 'Failed to remove item from backpack.', 'error');
    }
  };

  if (loading) {
    return (
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 py-8 md:py-12">
      <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex flex-col gap-2 mb-4">
            <h1 className="text-text-main dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              Your Backpack
            </h1>
            <p className="text-text-secondary dark:text-gray-400 text-base font-normal">
              {backpackItems.length} items ready for your next adventure.
            </p>
          </div>
          
          {backpackItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Your backpack is empty</p>
            </div>
          ) : (
            backpackItems.map((backpackItem) => (
              <ItemCard 
                key={backpackItem.id} 
                item={backpackItem} 
                imageMapper={imageMapper} 
                onDelete={handleDeleteItem}
              />
            ))
          )}

          <div className="w-full lg:w-[360px] xl:w-[400px] shrink-0">
            <Summary items={backpackItems} />  
          </div>
        </div>
      </div>
    </main>
  );
}
