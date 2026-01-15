import React from 'react'
import TopPickCard from './TopPickCard'

export default function TopPicks() {
  return (
    <section id="top-picks" className="bg-surface-light  py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900  mb-2">Top Picks</h2>
            <p className="text-gray-500 ">Highly rated rentals for your next trip</p>
          </div>

          <button className="flex items-center gap-2 bg-white  border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors">
            <span className="material-icons-round text-gray-500 text-lg">tune</span>
            Filters
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <TopPickCard
            imgAlt="Alpine Tent Set"
            imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuB87rh8ns_EOuHio8ngFz9bIjvgMI7SodQRBKK3K5YmDxpTRE0FXOE5k_OmKg17PQ3K7ANmJJIkQCQBWGT5frTdzDqdRAXYOdeTq-PIJoz9q_BtSLKcEdIp76aPMS0Xo92poHswh5WIDJp8fPKKOKGay28LJrzFNTYWTbF0PnIo9qBwBitbictflP2-p756zxG5DfcOoJAPtFngJNb6vCwmmSZBmNdDnGFAzQVeJrDvPViegN4g9rrYTIUpNAefGtEFW69CWyet1CI"
            rating="4.9"
            title="Alpine Tent Set"
            price="$45"
            location="Aspen, Colorado"
          />
          <TopPickCard
            imgAlt="Toyota Tacoma 4x4"
            imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuDNp-nC_Ax5wUlT1YziumiBXU43XeGRlLTVRdd2M4mHyImO41Xp0Mn5p7ruyh65UgmNmCuqoWn4bCzdqprluxrTUuAvlDLeHsJ9LrFhkrcb4oZvWviRgPx31A2hrrFZD3RF_7pPNhKpn4k4xfXvKwwfj5wukNafkMUlMu20LI1ooNwd71ppjgEpiKcHbHtAWF0LnJwVHtYUPQghJHxeoQksQS5smyJ-Zfi8p47V1-3vN20m1kzIMrunA0xnjbR6b9QO62YfaLUcUzk"
            rating="4.8"
            title="Toyota Tacoma 4x4"
            price="$120"
            location="Moab, Utah"
          />
          <TopPickCard
            imgAlt="Lakefront Cabin"
            imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuAmxxII4ncWaYer3hjfpPrLJtEPR50Quwk1g-Oka_gPvuEbjdK1ISQPx4XDCslhdoBtuNQGPQKh7mIM3nKHYfDrpQV6ojpbxezikzkhELj_02e1XV9qNejkJdn1SzHf9OdqOlyUh5RJRHwKMl424r1XxNfYx5IzDGC2B-q_HUZIxNFbLd-TJ9n7Bl0ew_eAwY17KB8Oj0fJOU54cdZlqgRRCKLja0Md6kRbM0vM8wnNmA1Jj2Onp0bWFn182OFlZPRV8Bvtf1nxviY"
            rating="5.0"
            title="Lakefront Cabin"
            price="$250"
            location="Tahoe, California"
          />
          <TopPickCard
            imgAlt="Tandem Kayak"
            imgSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ9U-DiZovTwPtcXA2i5GJ2-1tgfXmUay_z_xWvCB_X3GHAliLs8ocU-xzsx6idY40V_yrQlKw-lY0M7jcOno-dH4bcbwrtqxbBTZKavZWudCfc8fCUEqS8j8wD590o6YgmGd68eH43Q1qvr_NxD_Re_Rk1aFU22qwobZzzy4-k4cKsyBMxE5TryQNYIj4kR0RxzZvv-Ti34EQ_-htL86-53M0bl_a4FuphkWd6hf9OzxBHBvoPKAKRfWa7ZXxCMCCw2ETs6qzvns"
            rating="4.7"
            title="Tandem Kayak"
            price="$35"
            location="Austin, Texas"
          />
        </div>
      </div>
    </section>
  )
}
