# Install the Azure PowerShell modules using PowerShellGet.
if ($PSVersionTable.PSEdition -eq 'Desktop' -and (Get-Module -Name AzureRM -ListAvailable)) {
    Write-Warning -Message ('Az module not installed. Having both the AzureRM and ' +
        'Az modules installed at the same time is not supported.')
}
else {
    Install-Module -Name Az -AllowClobber -Scope CurrentUser
}

# deploy
pwsh ./scripts/Deploy.ps1 `
    -subscriptionId: "[ADD-SUBSCRIPTION-ID-HERE]" `
    -resourceGroupName: "[SET-RESOURCE-GROUP-NAME-HERE]" `
    -location: "[SET-DEPLOYMENT-LOCATION-HERE]" `
    -templateFilePath: ./templates/resources.json `
    -parametersFilePath: ./templates/params.dev.json
