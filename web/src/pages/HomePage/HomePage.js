import BasicLayout from 'src/layouts/BasicLayout'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

const searchClient = algoliasearch(
  'UXJ6FDXAZ3',
  'cf876e642393a8800a2fe502ff3e9cf8'
)

const Hit = ({ hit }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{hit.complaint_id}</div>
        <p className="text-gray-700 text-base">{hit.summary}</p>
        <p>{hit.district_occurrence}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          District {hit.district_occurrence}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Incident Id {hit.complaint_id}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          {hit.date_received}
        </span>
      </div>
    </div>
  )
}

const HomePage = () => {
  return (
    <BasicLayout>
      Mintbean 6-29
      <InstantSearch indexName="dev_mintbean-6-29" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
      </InstantSearch>
    </BasicLayout>
  )
}

export default HomePage
