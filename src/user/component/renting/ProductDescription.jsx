import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const ProductDescription = ({ product }) => {
  const [selectedTab, setSelectedTab] = useState("Description")

  return (
    <div className="mt-12 mb-18 text-sm text-slate-600">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 max-w-2xl">
        {["Description", "Reviews"].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setSelectedTab(tab)}
            className={`${
              tab === selectedTab
                ? "border-b-[1.5px] border-slate-900 font-semibold text-slate-900"
                : "text-slate-400"
            } px-3 py-2 font-medium`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Description */}
      {selectedTab === "Description" && (
        <div className="max-w-xl space-y-3">
          {/* Rating Row */}
          {typeof product.rating === "number" && (
            <div className="flex items-center gap-1 mb-2">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={`text-base ${
                      product.rating >= index + 1
                        ? "text-green-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}

              <span className="ml-2 text-xs text-slate-500">
                {product.rating.toFixed
                  ? product.rating.toFixed(1)
                  : product.rating}{" "}
                / 5
              </span>
            </div>
          )}

          <p>{product.description || "No description available."}</p>
        </div>
      )}

      {/* Reviews */}
      {selectedTab === "Reviews" && (
        <div className="flex flex-col gap-3 mt-6">
          {Array.isArray(product.reviews) && product.reviews.length > 0 ? (
            product.reviews.map((item, index) => (
              <div key={index} className="flex gap-5 mb-10">
                <img
                  src={item.user?.image}
                  alt={item.user?.name || "User"}
                  className="size-10 rounded-full object-cover"
                />

                <div>
                  {/* Star rating per review */}
                  <div className="flex items-center">
                    {Array(5)
                      .fill(0)
                      .map((_, idx) => (
                        <FontAwesomeIcon
                          key={idx}
                          icon={faStar}
                          className={`text-base ${
                            item.rating >= idx + 1
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>

                  <p className="text-sm max-w-lg my-4">{item.review}</p>

                  <p className="font-medium text-slate-800">{item.user?.name}</p>

                  <p className="mt-3 font-light">
                    {item.createdAt
                      ? new Date(item.createdAt).toDateString()
                      : ""}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No reviews yet for this item.
            </p>
          )}
        </div>
      )}

      {/* Store Section */}
      {product.store && (
        <div className="flex gap-3 mt-14">
          <img
            src={product.store.logo}
            alt={product.store.name}
            className="size-11 rounded-full ring ring-slate-400 object-cover"
          />
          <div>
            <p className="font-medium text-slate-600">
              Product by {product.store.name}
            </p>
            <Link
              to={`/shop/${product.store.username}`}
              className="flex items-center gap-1.5 text-green-500"
            >
              view store
              <FontAwesomeIcon icon={faArrowRight} size="sm" />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDescription
