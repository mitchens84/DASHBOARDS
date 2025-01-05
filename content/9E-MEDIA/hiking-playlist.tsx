import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const HikingPlaylist = () => {
  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Morning Hike with Bean - Curated Playlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Warm-Up Phase */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Warm-Up Phase (15 minutes)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2">Artist</th>
                    <th className="text-left p-2">Song</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">The xx</td>
                    <td className="p-2">Intro</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Tycho</td>
                    <td className="p-2">Awake</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Bonobo</td>
                    <td className="p-2">Kerala</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Air</td>
                    <td className="p-2">La Femme d'Argent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Main Hike Phase */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-green-600">Main Hike Phase (45 minutes)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2">Artist</th>
                    <th className="text-left p-2">Song</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">M83</td>
                    <td className="p-2">Midnight City</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">ODESZA</td>
                    <td className="p-2">Say My Name</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Röyksopp</td>
                    <td className="p-2">Running to the Sea</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Jon Hopkins</td>
                    <td className="p-2">Open Eye Signal</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Boards of Canada</td>
                    <td className="p-2">Dayvan Cowboy</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Four Tet</td>
                    <td className="p-2">Angel Echoes</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Kishi Bashi</td>
                    <td className="p-2">Manchester</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Nils Frahm</td>
                    <td className="p-2">Says</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Cool-Down Phase */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-purple-600">Cool-Down Phase (15 minutes)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="text-left p-2">Artist</th>
                    <th className="text-left p-2">Song</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">Brian Eno</td>
                    <td className="p-2">An Ending (Ascent)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Aphex Twin</td>
                    <td className="p-2">Avril 14th</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Sigur Rós</td>
                    <td className="p-2">Hoppípolla</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Stars of the Lid</td>
                    <td className="p-2">December Hunting for Vegetarian Fuckface</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HikingPlaylist;