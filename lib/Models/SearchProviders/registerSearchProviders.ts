import AustralianGazetteerSearchProvider from "./AustralianGazetteerSearchProvider";
import BingMapsSearchProvider from "./BingMapsSearchProvider";
import CesiumIonSearchProvider from "./CesiumIonSearchProvider";
import CustomNominatimSearchProvider from "./CustomNominatimSearchProvider";
import MapboxSearchProvider from "./MapboxSearchProvider";
import NominatimSearchProvider from "./NominatimSearchProvider";
import SearchProviderFactory from "./SearchProviderFactory";

export default function registerSearchProviders() {
  SearchProviderFactory.register(
    BingMapsSearchProvider.type,
    BingMapsSearchProvider
  );

  SearchProviderFactory.register(
    CesiumIonSearchProvider.type,
    CesiumIonSearchProvider
  );

  SearchProviderFactory.register(
    NominatimSearchProvider.type,
    NominatimSearchProvider
  );

  SearchProviderFactory.register(
    CustomNominatimSearchProvider.type,
    CustomNominatimSearchProvider
  );

  SearchProviderFactory.register(
    AustralianGazetteerSearchProvider.type,
    AustralianGazetteerSearchProvider
  );

  SearchProviderFactory.register(
    MapboxSearchProvider.type,
    MapboxSearchProvider
  );
}
