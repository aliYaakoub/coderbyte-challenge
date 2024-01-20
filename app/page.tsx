'use client';

import React from 'react';
import { data } from '@/constants';
import HighlightedText from '@/components/HighlightedText';
import ClearSearchButton from '@/components/ClearSearchButton';

export default function Home() {
  const [searchText, setSearchText] = React.useState<string>('');
  const [filteredData, setFilteredData] = React.useState<typeof data>([]);

  const handleClear = () => setSearchText('');

  React.useEffect(() => {
    if (!searchText) setFilteredData(data);

    setFilteredData(
      data.filter((item) => {
        const lowerCaseSearchText = searchText.toLowerCase();

        return (
          item.title.toLowerCase().includes(lowerCaseSearchText) ||
          item.description.toLowerCase().includes(lowerCaseSearchText)
        );
      }),
    );
  }, [searchText]);

  return (
    <main className='p-10 h-screen overflow-y-scroll'>
      <h1 className='text-3xl font-semibold'>Search</h1>

      <div className='border border-black overflow-hidden mt-10 w-80 rounded p-2 flex gap-5'>
        <input
          value={searchText}
          placeholder='Search'
          className='outline-none flex-grow'
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && <ClearSearchButton onClick={handleClear} />}
      </div>

      <p className='my-10'>
        {filteredData.length ? (
          <>
            <span className='font-bold'>{filteredData.length}</span>
            {filteredData.length > 1 ? ' Posts' : ' Post'} found
          </>
        ) : (
          'No posts found'
        )}
      </p>

      <div className='flex flex-col gap-5'>
        {filteredData.map(({ title, date, description }, index) => (
          <div key={index}>
            <h2 className='text-xl font-bold'>
              <HighlightedText text={title} highlight={searchText} />
            </h2>
            <p className='text-sm italic text-gray-500'>{date}</p>
            <p className='mt-4'>
              <HighlightedText text={description} highlight={searchText} />
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
