import BasicLayout from 'src/layouts/BasicLayout'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'
import {
  GoogleMapsLoader,
  GeoSearch,
  Control,
  Marker,
} from 'react-instantsearch-dom-maps'

const searchClient = algoliasearch(
  'EJBZYI8WQ0',
  'ad2529b88fd3b0de6b212fb578b47352'
)

const Hit = ({ hit }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{hit.company_name}</div>
        <p className="text-gray-700 text-base">{hit.physical_address}</p>
        <p>{hit.capability}</p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          District {hit.certification_type}
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

const Map = () => {
  return (
    <div style={{ height: 500 }}>
      <GoogleMapsLoader apiKey="AIzaSyD15AGnGsTDlU8CZoLYB4oBSQL1g5tdEDM">
        {(google) => (
          <GeoSearch google={google}>
            {({ hits }) => (
              <div>
                <Control />
                {hits.map((hit) => (
                  <Marker key={hit.objectID} hit={hit} />
                ))}
              </div>
            )}
          </GeoSearch>
        )}
      </GoogleMapsLoader>
    </div>
  )
}

const HomePage = () => {
  return (
    <BasicLayout>
      Mintbean 6-29
      <InstantSearch indexName="OEO_registry" searchClient={searchClient}>
        <SearchBox />
        <Hits hitComponent={Hit} />
        <Map />
      </InstantSearch>
    </BasicLayout>
  )
}

export default HomePage
