import BasicLayout from 'src/layouts/BasicLayout'
import { useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Hits,
  connectRefinementList,
} from 'react-instantsearch-dom'

const searchClient = algoliasearch(
  'EJBZYI8WQ0',
  'ad2529b88fd3b0de6b212fb578b47352'
)

const RefinementList = ({ items, isFromSearch, refine, createURL }) => {
  const bgColor = (type) => {
    if (type === 'MBE') {
      return 'bg-teal-500'
    } else if (type === 'WBE') {
      return 'bg-red-500'
    } else if (type === 'MWBE') {
      return 'bg-yellow-500'
    } else if (type === 'DBE') {
      return 'bg-green-500'
    } else {
      return 'bg-purple-500'
    }
  }

  const textColor = (type) => {
    if (type === 'MBE') {
      return 'text-teal-500'
    } else if (type === 'WBE') {
      return 'text-red-500'
    } else if (type === 'MWBE') {
      return 'text-yellow-500'
    } else if (type === 'DBE') {
      return 'text-green-500'
    } else {
      return 'text-purple-500'
    }
  }

  const styleColor = (type, target) => {
    if (type === 'MBE') {
      return `${target}-teal-500`
    } else if (type === 'WBE') {
      return `${target}-red-500`
    } else if (type === 'MWBE') {
      return `${target}-yellow-500`
    } else if (type === 'DBE') {
      return `${target}-green-500`
    } else {
      return `${target}-purple-500`
    }
  }

  return (
    <div>
      {items.map((item) => (
        <span key={item.label}>
          <a
            className={`inline-block ${
              item.isRefined
                ? `${bgColor(item.label)} text-white`
                : `bg-white ${textColor(item.label)}`
            } rounded-full px-3 py-1 text-sm border ${styleColor(
              item.label,
              'border'
            )} font-semibold mr-2`}
            href={createURL(item.value)}
            onClick={(event) => {
              event.preventDefault()
              refine(item.value)
            }}
          >
            {isFromSearch ? (
              <Highlight attribute="label" hit={item} />
            ) : (
              item.label
            )}{' '}
            ({item.count})
          </a>
        </span>
      ))}
    </div>
  )
}

const CustomRefinementList = connectRefinementList(RefinementList)

const Hit = ({ hit }) => {
  const color = (type) => {
    if (type === 'MBE') {
      return 'bg-teal-500'
    } else if (type === 'WBE') {
      return 'bg-red-500'
    } else if (type === 'MWBE') {
      return 'bg-yellow-500'
    } else if (type === 'DBE') {
      return 'bg-green-500'
    } else {
      return 'bg-purple-500'
    }
  }

  return (
    <div
      className={`max-w-sm rounded ${color(
        hit.certification_type
      )} mb-3 overflow-hidden shadow-lg mx-auto`}
    >
      <div className="px-6 py-4">
        <div className="font-bold text-white text-xl mb-2">
          {hit.company_name}
        </div>
        <p className="text-gray-100 text-base">
          {hit.owner_first} {hit.owner_last}
        </p>
        <h2>{hit.physical_address}</h2>
        <p className="text-white" f>
          {hit.capability}
        </p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {hit.certification_type}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {hit.phone}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm mt-2 font-semibold text-gray-700">
          {hit.email}
        </span>
      </div>
    </div>
  )
}

const HomePage = () => {
  const [mbe, setMbe] = useState(false)
  const [wmbe, setWmbe] = useState(false)
  const [wbe, setWbe] = useState(false)
  const [dsbe, setDsbe] = useState(false)
  const [dbe, setDbe] = useState(false)
  const [filter, setFilter] = useState('')

  const toggle = (type) => {
    console.log(mbe)
    if (type === 'MBE') {
      setMbe(!mbe)
    } else if (type === 'WBE') {
      setWmbe(!wmbe)
    } else if (type === 'MWBE') {
      setWmbe(!wmbe)
    } else if (type === 'DBE') {
      setDbe(!dbe)
    } else if (type === 'DSBE') {
      setDsbe(!dsbe)
    }
  }

  return (
    <BasicLayout>
      <div className="m-w-sm shadow-lg text-center p-5 mx-auto">
        <h2 className="text-5xl">Philadelphia OEO Database</h2>
        <p className="text-sm">
          Search Certified Minority, Women, Disabled and Disadvantaged Owned
          Business Enterprises around Philadelphia
        </p>
      </div>
      <div className="justify-center text-center mt-3">
        <InstantSearch indexName="OEO_registry" searchClient={searchClient}>
          <SearchBox className="m-w-xs bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" />
          <div className="px-6 py-4">
            <CustomRefinementList attribute="certification_type" />
          </div>
          <Hits
            dbe={dbe}
            dsbe={dsbe}
            wbe={wbe}
            mwbe={wmbe}
            mbe={mbe}
            className="text-center"
            hitComponent={Hit}
          />
        </InstantSearch>
      </div>
    </BasicLayout>
  )
}

export default HomePage
