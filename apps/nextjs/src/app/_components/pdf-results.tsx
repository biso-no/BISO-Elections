"use client";

import React, { useState } from "react";
import { FileTextIcon } from "@radix-ui/react-icons";
import {
  Document,
  Image,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

import type { RouterOutputs } from "@acme/api";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/dialog";
import { api } from "~/trpc/react";

// Define styles for PDF components
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  companyDetails: {
    fontSize: 10,
    color: "#555",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: "#666",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 24,
    fontStyle: "bold",
  },
  tableCol: {
    width: "50%",
    textAlign: "center",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
    color: "#666",
  },
  totalVotes: {
    fontSize: 12,
    marginTop: 10,
    color: "#666",
    fontWeight: "bold",
  },
});

interface ElectionResults {
  electionResults: RouterOutputs["elections"]["results"];
}

// Define the PDF component
function ElectionResultsPDF({ electionResults }: ElectionResults) {
  // Total votes for each position
  const totalVotes = (
    candidates: { votes: { id: string; electionCandidateId: string }[] }[],
  ) => candidates.reduce((acc, candidate) => acc + candidate.votes.length, 0);

  //Helper function to sum the votes for a candidate based on the votes weight
  const sumVotes = (votes: { weight: number }[]) =>
    votes.reduce((acc, vote) => acc + vote.weight, 0);

  return (
    <Document>
      {electionResults?.sessions.map((session, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text style={styles.companyDetails}>BI Student Organisation</Text>
            <Image style={styles.logo} src="logos/logo-light.svg" />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Election Results</Text>
            <Text style={styles.subtitle}>Session: {session.name}</Text>
            {session.positions.map((position, index) => (
              <View key={index}>
                <Text style={styles.subtitle}>{position.name}</Text>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCol, styles.tableCell]}>
                    Candidate
                  </Text>
                  <Text style={[styles.tableCol, styles.tableCell]}>Votes</Text>
                </View>
                {position.candidates.map((candidate, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCol, styles.tableCell]}>
                      {candidate.name}
                    </Text>
                    <Text style={[styles.tableCol, styles.tableCell]}>
                      {sumVotes(candidate.votes)}
                    </Text>
                  </View>
                ))}
                <Text style={styles.totalVotes}>
                  Total Votes: {totalVotes(position.candidates)}
                </Text>
              </View>
            ))}
          </View>
        </Page>
      ))}
    </Document>
  );
}

interface PDFResultsProps {
  electionId: string;
  disabled?: boolean;
}
// Define the PDF results component
export const PDFResults = ({ electionId, disabled }: PDFResultsProps) => {
  const [key, setKey] = useState(0); // Add a key state to force re-render
  const {
    data: electionResults,
    isLoading,
    refetch,
  } = api.elections.results.useQuery(electionId);

  // Function to manually refresh the data
  const refreshData = () => {
    refetch();
    setKey((prevKey) => prevKey + 1); // Increment key to force re-render
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <Dialog>
      <DialogTrigger asChild disabled={disabled}>
        <Button
          size="sm"
          variant="ghost"
          className="gap-2"
          disabled={disabled}
          onClick={refreshData}
        >
          <FileTextIcon /> Refresh & Print Results
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogClose asChild>
          <PDFViewer key={key} style={{ width: "100%", minHeight: "80vh" }}>
            <ElectionResultsPDF electionResults={electionResults} />
          </PDFViewer>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
