import useCurrentUser from '@/hooks/useCurrentUser';
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    marginBottom: 10,
    textDecoration: 'underline',
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: 'auto',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '40%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomWidth: 1,
    fontSize: 12,
    fontWeight: 'bold',
    padding: 5,
  },
  tableCol: {
    width: '60%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderBottomWidth: 1,
    fontSize: 12,
    padding: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    marginLeft: 5,
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    marginVertical: 5,
  },
  watermark: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    transform: 'rotate(-45deg)', // Added rotation
    opacity: 0.4,
    fontSize: 50,
    color: 'red',
    textAlign: 'center',
    zIndex: -1,
  },
});

// Create Document Component
// Create Document Component
const MyDocument = ({ reportData, role = 'officer' }) => {
  const user = useCurrentUser(role);

  console.log(reportData);
  if (
    !reportData ||
    !reportData.generalObservationsData ||
    !reportData.structuralObservationsData
  ) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text>Loading...</Text>
        </Page>
      </Document>
    );
  }

  const generalObservations = reportData.generalObservationsData;
  const structuralData = reportData.structuralObservationsData;

  // Helper function to render table rows with potential images
  const renderTableRow = (field, fieldValue) => {
    console.log(field, fieldValue);
    if (field === 'photo' && fieldValue) {
      return (
        <View style={styles.tableRow} key={field}>
          <Text style={styles.tableColHeader}>{field}</Text>
          <Image style={styles.tableCol} src={fieldValue} alt="field" />
        </View>
      );
    }
    return (
      fieldValue && (
        <View style={styles.tableRow} key={field}>
          <Text style={styles.tableColHeader}>{field}</Text>
          <Text style={styles.tableCol}>{fieldValue}</Text>
        </View>
      )
    );
  };

  const renderStructuralData = (data) => {
    return Object.entries(data).map(
      ([key, value]) =>
        hasData(value) && (
          <View key={key} style={styles.table}>
            <Text style={styles.sectionHeader}>{key}</Text>
            {Object.entries(value).map(
              ([subKey, subValue]) =>
                hasData(subValue) && (
                  <View key={subKey} style={styles.table}>
                    <Text style={styles.sectionHeader}>{subKey}</Text>
                    {Object.entries(subValue).map(([field, fieldValue]) =>
                      renderTableRow(field, fieldValue)
                    )}
                  </View>
                )
            )}
          </View>
        )
    );
  };

  return (
    <Document>
      <Page style={styles.page}>
        {user && <Text style={styles.watermark}>{user?.email}</Text>}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Building ID</Text>
              <Text style={styles.tableCol}>{reportData.buildingId}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Timestamp</Text>
              <Text style={styles.tableCol}>
                {new Date(reportData.timestamp).toLocaleString()}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>User ID</Text>
              <Text style={styles.tableCol}>{reportData.userId}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>General Observations</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Age of Building</Text>
              <Text style={styles.tableCol}>
                {generalObservations.ageOfBuilding}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Number of Stories</Text>
              <Text style={styles.tableCol}>
                {generalObservations.numberOfStories}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Date of Inspection</Text>
              <Text style={styles.tableCol}>
                {generalObservations.dateOfInspection}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Type of Structure</Text>
              <Text style={styles.tableCol}>
                {generalObservations.typeOfStructure}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Location</Text>
              <Text style={styles.tableCol}>
                {generalObservations.location}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>
                Architectural Plan Available
              </Text>
              <Text style={styles.tableCol}>
                {generalObservations.architecturalPlanAvailable ? 'Yes' : 'No'}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Name of Structure</Text>
              <Text style={styles.tableCol}>
                {generalObservations.nameOfStructure}
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>Size of Building</Text>
              <Text style={styles.tableCol}>
                {generalObservations.sizeOfBuilding}
              </Text>
            </View>
          </View>
        </View>
      </Page>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Structural Data</Text>
          {renderStructuralData(structuralData)}
        </View>
      </Page>
    </Document>
  );
};
export default MyDocument;

// Helper function to check if an object has any non-empty values
const hasData = (obj) => {
  return Object.values(obj).some((value) => value !== '');
};
