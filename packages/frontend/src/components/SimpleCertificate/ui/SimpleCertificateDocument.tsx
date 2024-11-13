'use client';

import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

interface SimpleCertificateProps {
  title: string;
  name: string;
  content: string;
  issueDate: string;
  issueNumber: string;
  issuerName: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
    border: '2 solid #000000',
    margin: 20,
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  issueNumber: {
    fontSize: 10,
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  recipientName: {
    fontSize: 24,
    marginBottom: 20,
  },
  content: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 1.5,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  issueDate: {
    fontSize: 12,
    marginBottom: 20,
  },
  issuerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const SimpleCertificateDocument = ({
  title,
  name,
  content,
  issueDate,
  issueNumber,
  issuerName,
}: SimpleCertificateProps) => {
  return (
    <Document
      author={issuerName}
      creator={issuerName}
      language="ko-KR"
      title={`${title}_${name}`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.issueNumber}>발급번호: {issueNumber}</Text>
          </View>
          
          <View style={styles.contentContainer}>
            <Text style={styles.recipientName}>{name}</Text>
            <Text style={styles.content}>{content}</Text>
          </View>
          
          <View style={styles.footer}>
            <Text style={styles.issueDate}>{issueDate}</Text>
            <Text style={styles.issuerName}>{issuerName}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default SimpleCertificateDocument; 