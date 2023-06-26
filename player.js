$(document).ready(function() {
    function fetchAndDisplayPlayerInfo(playerTag) {
        $.ajax({
            url: 'fetch_player_info.php',
            method: 'GET',
            data: {
                tag: playerTag
            },
            dataType: 'json',
            success: function(data) {
                // Handle missing clan data
                var clanName = data.clanName || '-';
                var clanLevel = data.clanLevel || '-';

                // Handle missing numeric values
                var attackWins = data.attackWins || 0;
                var defenseWins = data.defenseWins || 0;
                var receivedDonations = data.donationsReceived || 0;

                // Add player profile picture
                var profilePicture = data.profilePicture || 'default-avatar.png';

                $('#player-info tbody').append(
                    '<tr>' +
                    '<td><img src="' + profilePicture + '" class="profile-picture"></td>' +
                    '<td>' + data.name + '</td>' +
                    '<td>' + data.expLevel + '</td>' +
                    '<td>' + data.trophies + '</td>' +
                    '<td>' + clanName + '</td>' +
                    '<td>' + clanLevel + '</td>' +
                    '<td>' + data.role + '</td>' +
                    '<td>' + attackWins + '</td>' +
                    '<td>' + defenseWins + '</td>' +
                    '<td>' + data.donations + '</td>' +
                    '<td>' + receivedDonations + '</td>' +
                    '<td>' + data.warStars + '</td>' +
                    '<td>' + data.townHallLevel + '</td>' +
                    '<td><button class="delete-tag" data-tag="' + data.tag + '">Delete</button></td>' +
                    '</tr>'
                );
            },
            error: function(error) {
                console.log('Error:', error);
            },
        });
    }

    // Fetch profile picture button click event
    $('#fetch-profile-picture').click(function() {
        var playerTag = $('#player-tag-input').val();
        fetchProfilePicture(playerTag);
    });

    function fetchProfilePictures() {
        $('td.profile-picture-td').each(function() {
            var playerTag = $(this).closest('tr').find('.delete-tag').data('tag');
            var profilePictureTd = $(this);
    
            // Make an API call to retrieve player data
            $.ajax({
                url: 'https://api.clashofclans.com/v1/players/' + playerTag,
                method: 'GET',
                headers: {
                    Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjcyNGEzYjk3LTZkMTQtNDgzNi1iOGQ0LWEwMTk0MDY0OTYyOSIsImlhdCI6MTY4NzM3ODExNywic3ViIjoiZGV2ZWxvcGVyL2RlMmNjN2IxLTgwODQtNGNkNC1iNTQxLWE3NWM2MjNmMTYxNyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjMyLjE0Mi4yMDcuMjA2Il0sInR5cGUiOiJjbGllbnQifV19.wLCYVVKvSvWssuc0Qlxbc9-XqnUj4QllpNpSWJRpBJWBC0I-2CXrC1SSq_kmjUI1IzCExYVcDZp7A7DG-HbUkw'
                },
                success: function(data) {
                    // Extract the profile picture URL from the API response
                    var profilePicture = data.avatarUrls.medium;
    
                    // Update the profile picture for the corresponding player in the table
                    profilePictureTd.html('<img src="' + profilePicture + '" class="profile-picture">');
                },
                error: function(error) {
                    console.log('Error:', error);
                }
            });
        });
    }
    

    // Fetch war log button click event
    $('#fetch-war-log').click(function() {
        var playerTag = $('#player-tag-input').val();
        fetchWarLog(playerTag);
    });

    function fetchWarLog(playerTag) {
        // Make an API call to retrieve clan information
        $.ajax({
            url: 'https://api.clashofclans.com/v1/players/' + playerTag + '/warlog',
            method: 'GET',
            headers: {
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjcyNGEzYjk3LTZkMTQtNDgzNi1iOGQ0LWEwMTk0MDY0OTYyOSIsImlhdCI6MTY4NzM3ODExNywic3ViIjoiZGV2ZWxvcGVyL2RlMmNjN2IxLTgwODQtNGNkNC1iNTQxLWE3NWM2MjNmMTYxNyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjMyLjE0Mi4yMDcuMjA2Il0sInR5cGUiOiJjbGllbnQifV19.wLCYVVKvSvWssuc0Qlxbc9-XqnUj4QllpNpSWJRpBJWBC0I-2CXrC1SSq_kmjUI1IzCExYVcDZp7A7DG-HbUkw'
            },
            success: function(data) {
                // Extract the war log entries from the API response
                var warLogData = data.items;

                // Clear the existing war log entries
                $('#war-log tbody').empty();

                // Append the war log entries to the war log table
                for (var i = 0; i < warLogData.length; i++) {
                    var entry = warLogData[i];
                    var opponent = entry.opponent.name;
                    var result = entry.result;
                    var stars = entry.stars;

                    $('#war-log tbody').append(
                        '<tr>' +
                        '<td>' + opponent + '</td>' +
                        '<td>' + result + '</td>' +
                        '<td>' + stars + '</td>' +
                        '</tr>'
                    );
                }
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    }
    
        fetchProfilePictures();

    function refreshTable() {
        $.ajax({
            url: 'fetch_player_info_all.php',
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $('#player-info tbody').empty();
    
                for (var i = 0; i < data.length; i++) {
                    var player = data[i];
                    $('#player-info tbody').append(
                        '<tr>' +
                        '<td>' + player.name + '</td>' +
                        '<td>' + player.level + '</td>' +
                        '<td>' + player.trophies + '</td>' +
                        '<td>' + player.clan_name + '</td>' +
                        '<td>' + player.clan_level + '</td>' +
                        '<td>' + player.role + '</td>' +
                        '<td>' + player.attacks_won + '</td>' +
                        '<td>' + player.defenses_won + '</td>' +
                        '<td>' + player.donations + '</td>' +
                        '<td>' + player.received_donations + '</td>' +
                        '<td>' + player.war_stars + '</td>' +
                        '<td>' + player.townhall_level + '</td>' +
                        '<td><button class="delete-tag" data-tag="' + player.tag + '">Delete</button></td>' +
                        '</tr>'
                    );
                }
            },
            error: function(error) {
                console.log('Error:', error);
            },
        });
    
    $('#fetch-player-info').click(function() {
        var playerTag = $('#player-tag-input').val();
        fetchAndDisplayPlayerInfo(playerTag);
    });
    
    $('#add-tag').click(function() {
        var playerTag = $('#player-tag-input').val();
    
        $.ajax({
            url: 'insert_player_tag.php',
            method: 'POST',
            data: {
                tag: playerTag
            },
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    fetchAndDisplayPlayerInfo(playerTag);
                }
            },
            error: function(error) {
                console.log('Error:', error);
            },
        });
    });
    
    $(document).on('click', '.delete-tag', function() {
        var playerTag = $(this).data('tag');
        var deleteButton = $(this);
    
        $.ajax({
            url: 'delete_player_tag.php',
            method: 'POST',
            data: {
                tag: playerTag
            },
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    deleteButton.closest('tr').remove();
                }
            },
            error: function(error) {
                console.log('Error:', error);
            },
            complete: function() {
                refreshTable();
            }
        });
    });
    }   
    refreshTable();
});
